const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  sslEnabled: false,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});

const SALT_ROUNDS = 10;

module.exports.hashPassword = async (plainPasswordText) => {
  return await bcrypt.hash(plainPasswordText, SALT_ROUNDS);
};

module.exports.isPasswordValid = async (
  plainPasswordText,
  encryptedPassword
) => {
  return await bcrypt.compare(plainPasswordText, encryptedPassword);
};

module.exports.generateToken = (user) => {
  const userDetails = {
    id: user.id,
    email: user.email,
    user_type: user.user_type,
  };
  return jwt.sign(userDetails, process.env.JWT_SECRET, { expiresIn: "1day" });
};

module.exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports.setupFileUploadToAWS = () => {
  return multer({
    storage: multerS3({
      s3: s3,
      acl: "public-read-write",
      bucket: process.env.AWS_BUCKET,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        req?.files?.map((item) => {
          let directory = "";
          switch (file?.fieldname) {
            case "cover_photo":
              directory = `Images/Authors/Photos/${Date.now()}`;
              break;
            case "banner":
              directory = `Images/Authors/Banners/${Date.now()}`;
              break;
          }
          cb(null, directory);
        });
      },
    }),
  });
};

module.exports.createPaginationData = (req, page, limit, count) => {
  const includeNextLink = page * limit < count;
  const includePreviousLink = page > 1;

  let url =
    req.protocol + "://" + req.get("host") + req.baseUrl + req.route.path;
  const nextLink = includeNextLink
    ? url + `/?page=${page + 1}&limit=${limit}`
    : null;
  const previousLink = includePreviousLink
    ? url + `/?page=${page - 1}&limit=${limit}`
    : null;

  return {
    next: nextLink,
    prev: previousLink,
  };
};
