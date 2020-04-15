var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');

//Index Route
router.get('/', function(req, res) {
	Campground.find({}, function(err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds/index', { campgrounds: allCampgrounds, currentUser: req.user });
		}
	});
});

//Create Route
router.post('/', function(req, res) {
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = { name: name, image: image, description: desc };
	Campground.create(newCampground, function(err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			//redirect back to campgrounds page
			res.redirect('/campgrounds');
		}
	});
	// campgrounds.push(newCampground);
});

//Show Route
router.get('/new', function(req, res) {
	res.render('campgrounds/new');
});

//Show single route
router.get('/:id', function(req, res) {
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			// console.log(foundCampground);
			res.render('campgrounds/show', { campground: foundCampground });
		}
	});
});

module.exports = router;
