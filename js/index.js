var app = {

	init: function() {
		console.log('init');
		document.addEventListener('deviceready', app.ondeviceready, false);
		$('.search').click(app.search);
	},

	ondeviceready: function() {
		StatusBar.overlaysWebView(false);
		app.search();
	},

	makes: null,

	search: function() {

		var val = $('.searchval')[0].value;

		console.log('searching: ' + val);

		var makeapi = new Make({
		  apiURL: 'http://makeapi.webmaker.org'
		});

		var srch = makeapi
			.title(val)
			.sortByField( 'createdAt', 'desc' )

		srch.then(function( err, makes ) {

		  if( err ) {
		    alert('SHIT.');
		    return;
		  }

		  console.log('found ' + makes.length + ' results');

		  app.makes = makes;

		  if (makes.length == 0) {
		  	$('.results').html('<li>Didnt. Find. Shit.</li>');
		  } else {
		  	app.render(makes);	
		  }

		});
	},

	render: function(makes) {

	  var html = '';
	  makes.forEach(function(make) {
	  	html += '<li><a href="' + make.url + '">' + make.title + '</a></li>';
	  });
	  $('.results').html(html);

	  $('.results').find('a').click(app.load);
	},

	load: function(event) {
		event.preventDefault();
		var url = event.target.href
		console.log('loading ' + url);
		//window.location.href = url;
		window.open(url, 'blank', 'location=no');
		return false;
	}

};