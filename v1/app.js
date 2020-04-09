var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('landing');
});

app.get('/campgrounds', function(req, res) {
	var campgrounds = [
		{
			name: 'Salmon Creek',
			image:
				'https://australia.businessesforsale.com/australian/static/articleimage?articleId=12982&name=image2.jpg'
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
	res.render('campgrounds', { campgrounds: campgrounds });
});

app.listen(3000, function() {
	console.log('The YelpCamp Server Has Started');
});
