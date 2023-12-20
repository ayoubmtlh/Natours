const express=require("express")
const router = express.Router()
const Controller=require("./../Controllers/userControllers")
router.route("/").get(Controller.getAllUsers).post(Controller.createUser)
router.route("/:id").get(Controller.getUsers).patch(Controller.updateUser).delete(Controller.DeleteUser);
module.exports =router 