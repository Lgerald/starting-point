const express = require("express");
const router = express.Router();
const models = require("../models");
const Hotel = models.Hotel;
const Activity = models.Activity;
const Restaurant = models.Restaurant;

router.get("/api", ((req, res, next) => {
    const hotels = Hotel.findAll({ include: [{all: true}]});
    const restaurants = Restaurant.findAll({ include: [{ all: true }] });
    const activities = Activity.findAll({ include: [{ all: true }] });
    

    Promise.all([
        hotels,
        restaurants,
        activities
    ])
    .then(([hotels, restaurants, activites]) => {
        var allAttractions = {};
        allAttractions.hotels = hotels;
        allAttractions.restaurants = restaurants;
        allAttractions.activities = activites;
        res.json(allAttractions);
    })
    .catch(next);

    // var allAttractions = {};
    // Hotel.findAll()
    //     .then(function (hotels) {
    //         allAttractions.hotels = hotels;
    //         return Restaurant.findAll();
    //     })
    //     .then(function (restaurants) {
    //         allAttractions.restaurants = restaurants;
    //         return Activity.findAll();
    //     })
    //     .then(function (activities) {
    //         allAttractions.activities = activities;
    //     })
    //     .then(function () {
    //         res.json(allAttractions);
    //     })
    //     .catch(next);
}));





module.exports = router;
