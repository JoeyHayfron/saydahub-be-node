// const { User } = require("../models/user");
const url = require("url");
const {
  hashPassword,
  isPasswordValid,
  generateToken,
  setupFileUploadToAWS,
  createPaginationData,
} = require("../helpers/utils");
const { passwordRecoveryHtml } = require("../view/password-reset/index");
const passport = require("passport");
const Models = require("../models");
const nodemailer = require("nodemailer");
const { AUTHOR_STATUS } = require("../helpers/constants");

const mailTransporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

module.exports.createUser = async (req, res) => {
  try {
    const requiredFields = ["name", "email", "provider"];
    const emailConditionalRequiredFiles = ["password", "phone"];
    const fieldNotProvided =
      requiredFields.find((item) => !req.body[item]) ||
      (req.body.provider === "email" &&
        emailConditionalRequiredFiles.find((item) => !req.body[item]));
    if (fieldNotProvided) {
      res.status(400).send({ message: `${fieldNotProvided} is required` });
      return;
    } else {
      const userDetails = {
        ...req.body,
        password:
          req.body.provider === "email"
            ? await hashPassword(req.body.password)
            : "",
      };
      const newUser = await Models.User.create(userDetails);
      const token = generateToken(newUser);
      const { password, ...otherInfo } = newUser.dataValues;
      res
        .status(201)
        .send({ message: "User created successfully", user: otherInfo, token });
    }
  } catch (err) {
    let message = `An error occurred creating user: ${err}`;
    if (
      err.name === "SequelizeUniqueConstraintError" &&
      err.errors[0].validatorKey === "not_unique"
    ) {
      message = `${err.errors[0].path} already exists`;
      res.status(400).send({ message });
      return;
    }
    res.status(500).send({ message });
  }
};

module.exports.findOrCreate = async (userDetails) => {
  try {
    const user = await User.findOne({
      where: { email: userDetails.email },
    });
    if (!user) {
      const newUser = await User.create({
        name: userDetails.name,
        email: userDetails.email,
        provider: userDetails.provider,
      });
      const token = generateToken(newUser);
      return {
        err: null,
        data: { user_info: { ...newUser.dataValues }, token },
      };
    } else {
      const token = generateToken(user);
      return { err: null, data: { user_info: { ...user.dataValues }, token } };
    }
  } catch (err) {
    console.log("Google Auth Error Occurred");
    return { err, data: null };
  }
};

module.exports.sendPasswordRecoveryMail = async (req, res) => {
  //check if email provided is valid
  //send email with password recovery link if valid
  const userEmail = req.params.email;
  if (!userEmail) {
    res.status(400).send({ message: "Please provide email" });
    return;
  }
  const user = await Models.User.findOne({ where: { email: userEmail } });
  if (!user) {
    res.status(404).send({ message: "User with this email not found" });
    return;
  }

  const mailInfo = await mailTransporter.sendMail({
    from: `"${process.env.MAIL_FROM_NAME}" ${process.env.MAIL_FROM_ADDRESS}`,
    to: userEmail,
    subject: "Saydahub Password Recovery",
    html: passwordRecoveryHtml,
  });
};

module.exports.editUser = async (req, res) => {
  const user = await Models.User.findOne({
    where: { email: req.user_details.email },
  });
  let userImageProps = {
    banner: null,
    cover_photo: null,
  };

  if (req.files) {
    req?.files?.map((item) => {
      const splitFileName = item.originalname.split(".");
      const fileExtension = splitFileName.splice(-1)[0];
      userImageProps[item.fieldname] = `${item.location}.${fileExtension}`;
    });
  }

  let status_update = {};
  if (req?.query?.request_approval === "true") {
    status_update.author_status = AUTHOR_STATUS.PENDING;
  }

  user.set({ ...req.body, ...userImageProps, ...status_update });

  await user.save();

  const { password, ...rest } = user.dataValues;
  res.status(200).send({
    message: "User details updated successfully",
    data: { ...rest },
  });
};

module.exports.getAuthors = async (req, res) => {
  const page = parseInt(req.query?.page || 1);
  const limit = parseInt(req.query?.limit || 25);
  const offset = page > 1 ? (page - 1) * limit : 0;

  const authors = await Models.User.findAll({
    raw: true,
    where: { user_type: "author" },
    limit,
    offset,
  });
  const authorsCount = await Models.User.count({
    where: { user_type: "author" },
  });

  const paginationData = createPaginationData(req, page, limit, authorsCount);
  return {
    results: authors,
    count: authorsCount,
    ...paginationData,
  };
};

module.exports.getMyInformation = async (req, res) => {
  const user = await Models.User.findOne({
    attributes: { exclude: ["password"] },
    where: { email: req.user_details.email },
  });

  return {
    message: "User info fetched successfully",
    data: { ...user.dataValues },
  };
};

module.exports.getUserInformation = async (req, res, next) => {
  try {
    if (req.params.id) {
      const user = await Models.User.findOne({
        where: { id: req.params.id },
      });
      if (user) {
        const { password, ...rest } = user.dataValues;
        res.status(200).send({ data: { ...rest } });
      } else {
        res
          .status(404)
          .send({ message: `User with id ${req.params.id} not found` });
      }
    } else {
      res.status(400).send({ message: "No id provided in params" });
    }
  } catch (err) {
    res.status(500).send({ message: "An error occurred" });
  }
};
