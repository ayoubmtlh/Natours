const express=require("express")
const Controller=require("./../Controllers/tourController")
const router = express.Router()
const auth=require("./../Controllers/authController")
//router.param('id',Controller.checkID)
router.route("/TourStat").get(Controller.getTourStat)
router.route("/monthly-plan/:year").get(Controller.getMonthlyPlan)
router.route("/Top-5-Tours").get(Controller.getAlias,Controller.getAllTours)
router.route("/").get(auth.protect,Controller.getAllTours).post(Controller.createAtour)
router.route("/:id").get(Controller.getTourbyID).patch(Controller.updateAtour).delete(auth.protect,auth.restrictTo('admin'),Controller.DeleteAtour);
module.exports =router  