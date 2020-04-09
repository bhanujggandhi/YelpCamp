var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
// 	{
// 		name: 'Granite Hill',
// 		image: 'https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg'
// 	},
// 	function(err, campground) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log('NEWLY CAMPGROUND CREATED: ');
// 			console.log(campground);
// 		}
// 	}
// );

var campgrounds = [
	{ name: 'Salmon Creek', image: 'https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg' },
	{ name: 'Granite Hill', image: 'https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg' },
	{ name: "Mountain Goat's Rest", image: 'https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg' },
	{ name: 'Salmon Creek', image: 'https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg' },
	{ name: 'Granite Hill', image: 'https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg' },
	{ name: "Mountain Goat's Rest", image: 'https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg' },
	{ name: 'Salmon Creek', image: 'https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg' },
	{ name: 'Granite Hill', image: 'https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg' },
	{ name: "Mountain Goat's Rest", image: 'https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg' }
];

app.get('/', function(req, res) {
	res.render('landing');
});

app.get('/campgrounds', function(req, res) {
	Campground.find({}, function(err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds', { campgrounds: allCampgrounds });
		}
	});
});

app.post('/campgrounds', function(req, res) {
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = { name: name, image: image };
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

app.get('/campgrounds/new', function(req, res) {
	res.render('new');
});

app.listen(3000, function() {
	console.log('The YelpCamp Server Has Started');
});
