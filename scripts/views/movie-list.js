var MovieListView = Backone.View.extend({

	el: '#app',

	events: {},

	initialize: function() {

		// On lie la collection à la vue en 
		// l'instanciant à l'intérieur de la vue
		this.myMovieCollection = new MovieCollection();

		// On rend la vue une première fois 
		this.render();
	},

	render: function() {

	},


})