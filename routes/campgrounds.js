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

//Create Route - add new campground to DB
router.post('/', isLoggedIn, function(req, res) {
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = { name: name, image: image, description: desc, author: author };
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

//NEW - show form to create new campground
router.get('/new', isLoggedIn, function(req, res) {
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

// EDIT CAMPGROUND ROUTE
router.get('/:id/edit', checkCampgroundOwnership, function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground) {
		if (err) {
			res.redirect('/campgrounds');
		} else {
			res.render('campgrounds/edit', { campground: foundCampground });
		}
	});
});
// UPDATE CAMPGROUND ROUTE
router.put('/:id', checkCampgroundOwnership, function(req, res) {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
		if (err) {
			res.redirect('/campgrounds');
		} else {
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

// DESTROY CAMPGROUND ROUTE
router.delete('/:id', checkCampgroundOwnership, function(req, res) {
	Campground.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			res.redirect('/campgrounds');
		} else {
			res.redirect('/campgrounds');
		}
	});
});

function checkCampgroundOwnership(req, res, next) {
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, function(err, foundCampground) {
			if (err) {
				res.redirect('back');
			} else {
				if (foundCampground.author.id.equals(req.user._id)) {
					next();
				} else {
					res.redirect('back');
				}
			}
		});
	} else {
		res.redirect('back');
	}
}

//MiddleWare
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

module.exports = router;
