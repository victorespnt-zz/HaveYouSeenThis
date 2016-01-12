var MovieModel = Backbone.Model.extend({
	// Dans mon model film, je vais avoir un titre et un poster (URL)
	// Et si je l'ai vu ou pas (booléen)
	defaults: {
		title: '',
		poster: 'http://bit.ly/1L7a9TJ',
		seen: false
	}
});