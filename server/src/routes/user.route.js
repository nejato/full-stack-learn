import express from 'express'
import { body } from 'express-validator';
import userModel from '../models/user.model.js';
const router = express.Router();

router.post(
    "/signup",
    body("username")
        .exists().withMessage("Username minimum 8 characters")
        .custom(async value =>{
            const user = await userModel.findOne({})
        })
)
export default router;