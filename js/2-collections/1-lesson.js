const Book = Backbone.Model.extend();

// create a collection of models
const Library = Backbone.Collection.extend({
    model: Book 
})

// first way to add objects to collection: pass it an array of objects when initialized
const library = new Library([
    new Book({title: "The Allegory of Love", genre: "Literary Criticism", year: 1936}),
    new Book({title: "English Literature in the Sixteenth Century", genre: "Literary Criticism", year: 1954}),
    new Book({title: "The Personal Heresy", genre: "Literary Criticism", year: 1939})
])

// second way to add objects to collection: call add method on instantiated collection
library.add(new Book({title: "A Preface to Paradise Lost", genre: "Literary Criticism", year: 1942}));

// retrieves object/model at the specified index of the collection's models property
console.log(library.at(0));

// also retrieves the same object/model, but this time by the object's collection id or cid
console.log(library.get("c1")); 

// removing object/model
library.remove(library.at(0));

// add method can specify index at which to insert model/object into collection (in this case, at the beginning of the collection)
library.add(new Book({title: "Out of the Silent Planet", genre: "Science Fiction", year: 1938}), {at: 0});

// another way to add model to collection. No option for specifying index
library.push(new Book({title: "Perelandra", genre: "Science Fiction", year: 1943}));

// searching through collection. Returns array
const sciFiBooks = library.where({genre: "Science Fiction"});
console.log("all sci fi books", sciFiBooks);

// another search method; returns only first instance
const firstSciFiBook = library.findWhere({genre: "Science Fiction"});
console.log("first sci fi book", firstSciFiBook);

// more specific search. Only performs equality check on attributes
const specificSearch = library.where({genre: "Literary Criticism", title: "The Personal Heresy"});
console.log("multi parameter book search", specificSearch);

// search filters with custom logic must use .filter method
const filteredSearch = library.filter(function(book) {
    return book.get("year") > 1940;
});
console.log("filtered search", filteredSearch);

// iterating collection with .each method
function panegyric(bookTitle) {
    console.log(bookTitle + " is a great book");
}

library.each(function(book) {
    panegyric(book.attributes.title)
});

// same thing with es6
library.each(book => panegyric(book.attributes.title))

