import express from "express";
import { body } from "express-validator";
import userController from "../controllers/user.controller.js";
import requestHandle from "../handlers/request.handle.js";
import responseHandler from "../handlers/response.handler.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import userModel from "../models/user.model.js";
const router = express.Router();

router.post(
  "/signup",
  body("username")
    .exists()
    .withMessage("username is required ")
    .isLength({ min: 0 })
    .withMessage("Username minimum 8 characters")
    .custom(async (value) => {
      const user = await userModel.findOne({ username: value });
      if (user) return Promise.reject("username already used");
    }),
  body("password")
    .exists()
    .withMessage("password is required ")
    .isLength({ min: 0 })
    .withMessage("password minimum 8 characters"),
  body("confirmPassword")
    .exists()
    .withMessage("confirmPassword is required ")
    .isLength({ min: 0 })
    .withMessage("confirmPassword minimum 8 characters")
    .custom((value, { req }) => {
      if (value !== req.body.password) throw new Error("Confirm password not match");
      return true;
    }),
  body("displayName")
    .exists()
    .withMessage("displayName is required ")
    .isLength({ min: 8 })
    .withMessage("displayname minimum 8 characters"),
  requestHandle.validate,
  userController.signup
);
router.post(
  "/signin",
  body("username")
    .exists()
    .withMessage("username is required ")
    .isLength({ min: 0 })
    .withMessage("Username minimum 8 characters"),
  body("password")
    .exists()
    .withMessage("password is required ")
    .isLength({ min: 0 })
    .withMessage("password minimum 8 characters"),
  body("displayName").isLength({ min: 8 }).withMessage("displayname minimum 8 characters"),
  requestHandle.validate,
  userController.signin
);
router.put(
  "/update-password",
  tokenMiddleware.auth,
  body("password")
    .exists()
    .withMessage("password is required ")
    .isLength({ min: 0 })
    .withMessage("password minimum 8 characters"),
    body("newPassword")
    .exists()
    .withMessage("newPassword is required ")
    .isLength({ min: 0 })
    .withMessage("newPassword minimum 8 characters"),
  body("confirmNewPassword")
    .exists()
    .withMessage("confirmNewPassword is required ")
    .isLength({ min: 0 })
    .withMessage("confirm New Password minimum 8 characters")
    .custom((value, { req }) => {
      if (value !== req.body.password) throw new Error("Confirm confirm New Password not match");
      return true;
    }),
    requestHandle.validate, 
    userController.updatePassword
);
router.get(
    "/info",
    tokenMiddleware.auth,
    userController.getInfo
)
// router.get(
//     "/info",
//     tokenMiddleware.auth,
//     userController.getInfo
// )
export default router;
