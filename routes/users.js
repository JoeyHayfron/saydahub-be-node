const express = require("express");
const router = express.Router();
const {
  createUser,
  sendPasswordRecoveryMail,
  editUser,
  getAuthors,
  getMyInformation,
  getUserInformation,
} = require("../controllers/users");
const { setupFileUploadToAWS } = require("../helpers/utils");
const { isAuthenticated } = require("../middlewares/authentication");
const passport = require("passport");
/**
 *  @swagger
 * components:
 *  securitySchemes:
 *    BearerAuth:            # arbitrary name for the security scheme
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */

/**
 * @swagger
 *
 * /register:
 *    post:
 *      tags:
 *      - User Routes
 *      summary: Register a user
 *      description: Register a user using email and password
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *                - email
 *                - provider
 *                - password
 *                - phone
 *              properties:
 *                name:
 *                  type: string
 *                  description: Users full name
 *                  example: Sayda Hub
 *                email:
 *                  type: string
 *                  description: Users email address
 *                  example: saydahub@gmail.com
 *                provider:
 *                  type: string
 *                  description: Registration type (email)
 *                  example: email
 *                password:
 *                  type: string
 *                  description: Users password
 *                  example: saydahub123
 *                phone:
 *                  type: number
 *                  description: Users phone number
 *                  example: 0200000000
 *      responses:
 *        201:
 *          description: Created
 *        404:
 *          description: Not Found
 *        400:
 *          description: Bad Request
 *        500:
 *          description: Server Error
 */
router.post("/register", async (req, res, next) => {
  try {
    await createUser(req, res);
  } catch (err) {
    res.status(500).send({
      message: `An error occurred creating user: ${err}`,
    });
  }
});

/**
 * @swagger
 *
 * /login:
 *    post:
 *      tags:
 *      - User Routes
 *      summary: Login User
 *      description: Login user with email and password
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - username
 *                - password
 *              properties:
 *                username:
 *                  type: string
 *                  description: Users email
 *                  example: saydahub@gmail.com
 *                password:
 *                  type: string
 *                  description: Users password
 *                  example: saydahub123
 *      responses:
 *        200:
 *          description: Success
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: Not Found
 *        400:
 *          description: Bad Request
 */
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res, next) => {
    try {
      res.status(200).send({
        message: "Login successful",
        data: {
          token: req.user.token,
          user_info: req.user.user_info,
        },
      });
    } catch (err) {
      res.status(401).send({ message: `An error occurred logging in: ${err}` });
    }
  }
);

/**
 * @swagger
 *
 * /social-auth/google:
 *    post:
 *      tags:
 *      - User Routes
 *      summary: Social Auth (Google)
 *      description: Authenticate user with Google.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - access_token
 *              properties:
 *                access_token:
 *                  type: string
 *                  description: Access token retrieved from the client side using Google authentication (Firebase)
 *                  example: yb29.a0AfB_byB1RoC0FRaYz3Amuh0H2UMCSNe226aHiNi3Tjd3ChK708MiqrBpiSuabjjsHBZxhi9QFa37YQFkY-Hh1cWyLWabyyYJqOTvl6yTKge37X6i8rEuYsdncDsUKAhcZ6PHLIrLNcMT74OgVMvA7lGqV-Hbmrq53j_haCgYKAWQSARESFQHGX2Mi5HFp07yd97zabERl0bzh-A0171
 *      responses:
 *        200:
 *          description: Success
 *        500:
 *          description: Server Error
 */
router.post(
  "/social-auth/google",
  passport.authenticate("google-oauth-token", { session: false }),
  (req, res, next) => {
    try {
      res.status(200).send({
        message: "Authentication Successful",
        data: {
          token: req.user.token,
          user_info: req.user.user_info,
        },
      });
    } catch (err) {
      res
        .status(500)
        .send({ message: "An error occurred while authenticating the user" });
    }
  }
);

/**
 * @swagger
 *
 * /social-auth/facebook:
 *    post:
 *      tags:
 *      - User Routes
 *      summary: Social Auth (Facebook)
 *      description: Authenticate user with Facebook.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - access_token
 *              properties:
 *                access_token:
 *                  type: string
 *                  description: Access token retrieved from the client side using Google authentication (Firebase)
 *                  example: yb29.a0AfB_byB1RoC0FRaYz3Amuh0H2UMCSNe226aHiNi3Tjd3ChK708MiqrBpiSuabjjsHBZxhi9QFa37YQFkY-Hh1cWyLWabyyYJqOTvl6yTKge37X6i8rEuYsdncDsUKAhcZ6PHLIrLNcMT74OgVMvA7lGqV-Hbmrq53j_haCgYKAWQSARESFQHGX2Mi5HFp07yd97zabERl0bzh-A0171
 *      responses:
 *        200:
 *          description: Success
 *        500:
 *          description: Server Error
 */
router.post(
  "/social-auth/facebook",
  passport.authenticate("facebook-token", { session: false }),
  (req, res, next) => {
    try {
      res.status(200).send({
        message: "Authentication Successful",
        data: {
          token: req.user.token,
          user_info: req.user.user_info,
        },
      });
    } catch (err) {
      res
        .status(500)
        .send({ message: "An error occurred while authenticating the user" });
    }
  }
);

/**
 * @swagger
 *
 * /forgot-password/{email}:
 *    get:
 *      tags:
 *      - User Routes
 *      summary: Forgot Password Link
 *      description: Endpoint that forwards a password reset link to the users email
 *      parameters:
 *        - in: path
 *          name: email
 *          required: true
 *          description: Users email
 *          example: saydahub@gmail.com
 *      responses:
 *        200:
 *          description: Success
 *        500:
 *          description: Server Error
 */
router.get("/forgot-password/:email", async (req, res, next) => {
  try {
    await sendPasswordRecoveryMail(req, res);
    res.status(200).send({
      message:
        "An email has been sent to you with a link to change your password",
    });
  } catch (err) {
    res.status(500).send({ message: "An error occurred please try again." });
  }
});

/**
 * @swagger
 *
 * /me/edit:
 *    patch:
 *      security:
 *        - BearerAuth: []
 *          required: true
 *      tags:
 *      - User Routes
 *      summary: Edit user data (Logged in user)
 *      description: Editing user data and can also be used to request to become an author
 *      parameters:
 *       - in: query
 *         name: request_approval
 *         required: false
 *         description: Query param to indicate a user requesting to become an author
 *         example: true
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  required: false
 *                  description: Users full name
 *                  example: Sayda Hub
 *                email:
 *                  type: string
 *                  required: false
 *                  description: Users email
 *                  example: saydahub@gmail.com
 *                phone:
 *                  type: number
 *                  required: false
 *                  description: Users phone number
 *                  example: 0200000000
 *                cover_image:
 *                  type: file
 *                  required: false
 *                  description: Users cover photo
 *                banner:
 *                  type: file
 *                  required: false
 *                  description: Users banner image
 *                bio:
 *                  type: string
 *                  required: false
 *                  description: Users bio
 *                website:
 *                  type: string
 *                  required: false
 *                  description: Users website
 *      responses:
 *        200:
 *          description: Success
 *        401:
 *          description: Unauthorized
 *        500:
 *          description: Server Error
 */
router.patch(
  "/me/edit",
  isAuthenticated,
  setupFileUploadToAWS().any(),
  async (req, res, next) => {
    try {
      await editUser(req, res);
    } catch (err) {
      console.log("User Edit Error: ", err);
      res
        .status(500)
        .send({ message: "An error occurred editing your information." });
    }
  }
);

/**
 * @swagger
 *
 * /authors:
 *    get:
 *      security:
 *        - BearerAuth: []
 *          required: true
 *      tags:
 *      - User Routes
 *      summary: Get all authors
 *      description: Get all registered authors on the platform
 *      parameters:
 *       - in: query
 *         name: request_approval
 *         required: false
 *         description: Query param to indicate a user requesting to become an author
 *         example: true
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  required: false
 *                  description: Users full name
 *                  example: Sayda Hub
 *                email:
 *                  type: string
 *                  required: false
 *                  description: Users email
 *                  example: saydahub@gmail.com
 *                phone:
 *                  type: number
 *                  required: false
 *                  description: Users phone number
 *                  example: 0200000000
 *                cover_image:
 *                  type: file
 *                  required: false
 *                  description: Users cover photo
 *                banner:
 *                  type: file
 *                  required: false
 *                  description: Users banner image
 *                bio:
 *                  type: string
 *                  required: false
 *                  description: Users bio
 *                website:
 *                  type: string
 *                  required: false
 *                  description: Users website
 *      responses:
 *        200:
 *          description: Success
 *        401:
 *          description: Unauthorized
 *        500:
 *          description: Server Error
 */
router.get("/authors", isAuthenticated, async (req, res, next) => {
  try {
    const response = await getAuthors(req, res);
    res.status(200).send(response);
  } catch (err) {
    console.log("Get Authors Error: ", err);
    res.status(500).send({ message: "An error occurred fetching authors" });
  }
});

/**
 * @swagger
 *
 * /me:
 *    get:
 *      security:
 *        - BearerAuth: []
 *          required: true
 *      tags:
 *      - User Routes
 *      summary: Get Logged in user information
 *      description: Get information of an authenticated user.
 *      responses:
 *        200:
 *          description: Success
 *        404:
 *          description: Not Found
 *        401:
 *          description: Unauthorized
 *        500:
 *          description: Server Error
 */
router.get("/me", isAuthenticated, async (req, res, next) => {
  try {
    const response = await getMyInformation(req, res);
    res.status(200).send(response);
  } catch (err) {
    console.log("Get User Info Error: ", err);
    res.status(500).send({ message: "An error occurred fetching user info" });
  }
});

/**
 * @swagger
 *
 * /me:
 *    get:
 *      security:
 *        - BearerAuth: []
 *          required: true
 *      tags:
 *      - User Routes
 *      summary: Get User information
 *      description: Get information of a particular user
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Id of user
 *          required: true
 *      responses:
 *        200:
 *          description: Success
 *        404:
 *          description: Not Found
 *        401:
 *          description: Unauthorized
 *        500:
 *          description: Server Error
 */
router.get("/:id", isAuthenticated, getUserInformation);

module.exports.userRouter = router;
