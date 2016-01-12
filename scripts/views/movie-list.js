var MovieListView = Backbone.View.extend({

    el: '#app',

    events: {
        'submit form': 'addMovie',
        'change input[type="radio"]': 'seeMovie'
    },

    seeMovie: function(event) {
        var $input = $(event.currentTarget);
        var inputValue = $input.val();

        // Je récupère le data title tu li au dessus
        var movieTitle = $input.parents('li').attr('data-title');

        // Je regarde dans ma collection si j'ai un model
        // Qui porte le nom de celui sur lequel on a cliqué
        // Si oui, on sticke dans TargetModel
        var targetModel = this.myMovieCollection.findWhere({
            title: movieTitle
        });

        if (targetModel) {
            if (inputValue === 'seen') {
                targetModel.set({
                    seen: true
                });

            } else {
                targetModel.set({
                    seen: false
                });
            }
        }
    },

    // On va ajouter le film à ma collection
    addMovie: function(event) {
        // Kill l'event
        event.preventDefault();

        // On récupère les valeurs des champs des formulaires
        var $form = $(event.currentTarget);
        var movieTitle = $form.find('.movie-title').val();
        var moviePoster = $form.find('.movie-poster').val();

        // Avec mes donées, je créé un nouveau film
        // Donc un nouveau model
        var newMovieModel = new MovieModel({
            title: movieTitle,
            poster: moviePoster
        });

        // Je viens d'ajouter ce model dans ma collection
        this.myMovieCollection.add(newMovieModel);

        // Une fois qu'on a ajoute notre film
        // On va vouloir l'afficher à l'écran
        // Donc il va falloir rendre la vue
        this.render();
    },

    initialize: function() {

        // On lie la collection à la vue en 
        // l'instanciant à l'intérieur de la vue
        this.myMovieCollection = new MovieCollection();

        // On rend la vue une première fois 
        this.render();
    },

    render: function() {

        // On récuppère la cible
        var $renderTarget = this.$('.movie-list');

        // On le vide
        $renderTarget.empty();

        // Je récupère tous les films de ma collection avec .toJSON (cf cours)
        var allMyMovies = this.myMovieCollection.toJSON();

        // console.log("allMyMovies", allMyMovies);
        // // On récupère un tableau d'objets
        // // [{title: 'star wars', poster: 'url', seen: false}]

        for (var i = 0; i < allMyMovies.length; i++) {
            var movie = allMyMovies[i];

            // Pour chaque film, je récuppère le template
            // En lui donnant les données du film
            var movieTemplate = this.getTemplate(movie);

            // Une fois que le template est récupéré
            // On l'ajoute au DOM
            $renderTarget.append(movieTemplate);
        }
    },

    getTemplate: function(movieData) {
        // ici, movieData est un objet du type
        // {title: 'truc', poster.......}

        var isSeenChecked = '';
        var isNotSeenChecked = 'checked';

        // Si le film est vu et que movieData.seen est true
        // On echek le premier input et pas le deuxième 

        if (movieData.seen) {
            isSeenChecked = 'checked'
            isNotSeenChecked = '';
        }

        var movieTemplate = '\
			<li data-title="'+ movieData.title +'">\
			<h2>' + movieData.title + '</h2>\
			<img src ="' + movieData.poster + '" />\
			<form>\
			<label>Vu</label>\
			<input ' + isSeenChecked + ' type="radio" class+"movie-seen" name="movie" value="seen" />\
			<label>Pas Vu</label>\
			<input ' + isNotSeenChecked + ' type="radio" class+"movie-unseen" name="movie" value="unseen" />\
			</form>\
			</li>\
		';

        // On retourne la string 
        // convertie en HTML grâce à jQuery
        return $(movieTemplate);

    },

});