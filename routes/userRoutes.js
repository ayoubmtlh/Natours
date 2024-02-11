const express=require("express")
const authController=require("./../Controllers/authController")
const router = express.Router()
const Controller=require("./../Controllers/userControllers")
router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login)
router.route('/forgotPassword').post(authController.forgotPassword)
router.route('/resetPassword/:token').patch(authController.resetPassword)

router.route("/").get(Controller.getAllUsers).post(Controller.createUser)

router.route("/:id").get(Controller.getUsers).patch(Controller.updateUser).delete(Controller.DeleteUser);
module.exports =router 