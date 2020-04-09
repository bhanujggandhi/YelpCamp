var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var campgrounds = [
	{
		name: 'Salmon Creek',
		image: 'https://australia.businessesforsale.com/australian/static/articleimage?articleId=12982&name=image2.jpg'
	},
	{
		name: 'Granite Hill',
		image: 'https://uk.businessesforsale.com/uk/static/articleimage?articleId=10065&name=image2.jpg'
	},
	{
		name: "Mountain Goat's Rest",
		image: 'https://thumbs.dreamstime.com/b/night-view-tent-near-mountain-lake-russia-hibiny-39339696.jpg'
	}
];

app.get('/', function(req, res) {
	res.render('landing');
});

app.get('/campgrounds', function(req, res) {
	res.render('campgrounds', { campgrounds: campgrounds });
});

app.post('/campgrounds', function(req, res) {
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = { name: name, image: image };
	campgrounds.push(newCampground);
	//redirect back to campgrounds page
	res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res) {
	res.render('new');
});

app.listen(3000, function() {
	console.log('The YelpCamp Server Has Started');
});
