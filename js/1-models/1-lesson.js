// Creating a model
var Book = Backbone.Model.extend({
    // just like c# constructors
    initialize: function() { 
        console.log("Another book has been added to the library");
    },
    // specify default values (how does this differ from initialize?)
    defaults: {
        medium: "printed matter"
    }
}); // extend method returns a js constructor function (hence capital letter of Book)

// Instantiates the model
var book1 = new Book(); 

// Setting attributes must be done by the .set method; doesn't work by regular reference
book1.set("title", "Example Book"); // attributes can be set singly
book1.set({ // or as json objects
    author: "Justin",
    type: "autobiography"
})

// Or when object is initialized
var book2 = new Book({
        title: "Eloquent Javascript",
        author: "Genius Hacker",
        type: "Coding"
});

// can convert objects to JSON
console.log(book1.toJSON(), book2.toJSON());

// can convert JSON objects to Backbone models
book3 = new Book({
    title: "A Preface to Paradise Lost",
    author: "C.S. Lewis",
    type: "Literary Criticism"
});

// change object attrs with book1.unset("attributeName");
// delete all object attrs with book1.clear();
// check if object has attrs with book1.has("title");

// object validation must be in the model
var Song = Backbone.Model.extend({
    validate: function(attrs) {
        if (!attrs.title)
            return "Title is required";
    }
})
var song1 = new Song(); // no song title
console.log(song1.isValid()); // false
console.log(song1.validationError); // prints the error message specified in validate method
song1.set("title", "Tristesse Etude");
console.log(song1.isValid()); // true

// extending models
var Animal = Backbone.Model.extend({
    grow: function() {
        console.log("Has vegetative functions.");
    },
    sense: function() {
        console.log("Has sensitive functions.");
    }
});

var Human = Animal.extend({
    think: function() {
        console.log("Has rational functions.");
    },
    // Overriding methods in base model type or class
    sense: function() {
        console.log("Sensitive faculties are informed by intentionality.");
        Animal.prototype.sense.apply(this); // But it's still possible to access the base class method (in C# this would use the 'base' keyword)
    }
});
var human = new Human();
human.grow();
human.sense();
human.think();
