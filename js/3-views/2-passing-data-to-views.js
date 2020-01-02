// this is the built in backbone way to send an instantiated model to an instantiated view
const Book = Backbone.Model.extend();
const LibrarySingleModelView = Backbone.View.extend({
    tagName: "li", // Otherwise defaults to a div. 
    render() {
        this.$el.html(this.model.get("title")); // 'this' refers to the instantiated view; this.$el refers to the cached jQuery object that contains a particular DOM element; but instantiated views also have a model property, so that it can manage model data in the DOM.
        return this;
    }
});

const book1 = new Book({title: "Harry Potter and Sorcerer's Stone"});
const librarySingleModelView = new LibrarySingleModelView({model: book1}); // Creates the view, with its model property loaded, in DOM memory, but not in the page
$("#container").html(librarySingleModelView.$el); // Transfers the newly created li element which is stuck in DOM memory inside the container div on the page to make it appear (isn't that rendering, though?)
librarySingleModelView.render(); // Puts the text of the model-object inside the html of the li element (see the render function defined above)
// The above two lines could be chained as such:
// $("#container").html(librarySingleModelView.render().$el);


// adding an instantiated collection to an instantiated view
const Library = Backbone.Collection.extend({
    model: Book
});

const library = new Library([
    new Book({title: "Harry Potter and the Chamber of Secrets"}),
    new Book({title: "Harry Potter and the Prisoner of Azkaban"}),
    new Book({title: "Harry Potter and the Goblet of Fire"})
]);


// There really aren't collection views. They are just loops of regular views over a collection
const LibraryCollectionView = Backbone.View.extend({
    render() {
        this.model.each(book => { // this.model is the collection that's passed to the view; .each is an underscore method
            const librarySingleModelView = new LibrarySingleModelView({model: book}); // creates view for each child in the collection
            this.$el.append(librarySingleModelView.render().$el);
        })
    }
});

const libraryCollectionView = new LibraryCollectionView({el: "#container", model: library});
libraryCollectionView.render();
