const Movie = Backbone.Model.extend();
const Movies = Backbone.Collection.extend({
    model: Movie
});

const MovieView = Backbone.View.extend({
    tagName: "li",
    render() {
        this.$el.html(this.model.get('title'));
        this.$el.attr("id", this.model.id);
        return this;
    }
});

// Declaring the collection, with its event handlers in the initialize function and methods
const MoviesView = Backbone.View.extend({
    tagName: "ul",
    initialize() {
        this.model.on("add", this.onMovieAdded, this); // Using initialize method to register an event handler. All backbone collectiosn trigger events when items are added or removed
        this.model.on("remove", this.onMovieRemoved, this);
    },
    onMovieAdded(movie) { // The add event which is fired gets an argument: the object that was just added
        const movieView = new MovieView({model: movie});
        this.$el.append(movieView.render().$el); // movieView.render() adds the title into the li element, then it's returned and the whole jquery cached object, now with the title, is appended to the ul element
        console.log("Movie added"); // add one with movies.add(new Movie({title: "Memento"}));
    },
    onMovieRemoved(movie) {
        this.$el.find("li#" + movie.id).remove(); // OR this.$("li#" + movie.id).remove();
        console.log("Movie removed"); // remnove one from the collection with movies.remove(movies.at(0));
    },
    render() {
        this.model.each(movie => { // takes in a backbone collection, which is ultimately an array of movies (see below)
            const movieView = new MovieView({model: movie}) // and passes each one individually to its own view
            this.$el.append(movieView.render().$el); // takes the movie view's dom element (ul) wrapped in cached jquery object and appends the rendered movieView jquery-wrapped dom element (li) to it
            // in other words, it takes the li element and puts it in the ul element. To see the difference between the $el properties (which refer to different instantiated views), console log them:
            // console.log(this.$el);
            // console.log(movieView.$el)
        });
    }
})

const movies = new Movies([
    new Movie({title: "Batman Begins", id: 1}),
    new Movie({title: "The Dark Knight", id: 2}),
    new Movie({title: "The Dark Knight Rises", id: 3}),
])

const moviesView = new MoviesView({el: "#container", model: movies}); // creates a view and its associated element in memory and model in memory (remember, it's the go-between for these two things; it must have them)
moviesView.render(); // puts those memory elements in the html on the page