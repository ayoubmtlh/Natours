const express=require("express")
const Controller=require("./../Controllers/tourController")
const router = express.Router()

//router.param('id',Controller.checkID)
router.route("/").get(Controller.getAllTours).post(Controller.createAtour)
router.route("/:id").get(Controller.getTourbyID).patch(Controller.updateAtour).delete(Controller.DeleteAtour);
module.exports =router 