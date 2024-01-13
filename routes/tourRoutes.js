const express=require("express")
const Controller=require("./../Controllers/tourController")
const router = express.Router()

//router.param('id',Controller.checkID)
router.route("/TourStat").get(Controller.getTourStat)
router.route("/monthly-plan/:year").get(Controller.getMonthlyPlan)
router.route("/Top-5-Tours").get(Controller.getAlias,Controller.getAllTours)
router.route("/").get(Controller.getAllTours).post(Controller.createAtour)
router.route("/:id").get(Controller.getTourbyID).patch(Controller.updateAtour).delete(Controller.DeleteAtour);
module.exports =router 