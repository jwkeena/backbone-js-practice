const LibraryView = Backbone.View.extend({
    render: function() {
        this.$el.html("Hello World"); // $el is a cached jQuery object that contains the view's DOM element when instantiated. That's why calling methods on it here affects what you see in the browser, when those view objects are instantiated

        return this; // To chain method calls later
    }
});

// declare instance of view
const libraryView = new LibraryView ({ el: "#container"}); // Every view must have a reference to a DOM element to attach it. We are setting the el property to a jQuery selector string.
libraryView.render();

// el property: jQuery selector that references the DOM element that this view owns, i.e. the one it fills with content.
// $el property: cached jQuery object that contains this DOM element.

// Alternate way to declare and instantiate views
const AltLibraryView = Backbone.View.extend({
    el: "#container-alt", // Instead of passing it in to the constructor, hard-code it in here
    initialize() {
        this.render();
    },
    render() {
        this.$el.html("Alternate Hello World");
    }
});

const altLibraryView = new AltLibraryView();

// Testing for dynamic inputs into instantiated view
let randomNumber = Math.floor(Math.random()*10000);
const DynamicView = Backbone.View.extend({
    el: "#container-dynamic-view",
    initialize(randomNumber) {
        this.render(randomNumber);
    },
    render(randomNumber) {
        this.$el.html(randomNumber);
        // pickNewNumber(this); // uncomment to make the number change every second dynamically
    }
});
const dynamicView = new DynamicView(randomNumber);

function pickNewNumber(viewObject) {
    randomNumber =  Math.floor(Math.random()*10000);  
    setTimeout(() => {
        viewObject.render(randomNumber);
    }, 1000)
};

// Another way to attach a DOM element to its cached jQuery object
const libraryView2 = new LibraryView();
libraryView2.render();
$("#container2").html(libraryView2.$el) // Notice that this method inserts its own div into the element

// can a view's el property be changed dynamically? I mean the view class itself. The answer is yes.
const DemoView = Backbone.View.extend({
    render() {
        this.$el.html("working")
    }
})

containerVariable = "#container3" // switch between 3 and 4 to see it move
demoView = new DemoView({el: containerVariable})
demoView.render();

// changing a view's html properties

const SongView = Backbone.View.extend({
    tagName: "span",
    className: "song",
    id: "1234",
    attributes: {
        "data-genre": "Jazz"
    },
    render: function() {
        this.$el.html("Yet another meaningless view name");
        return this;
    }
});

const songView = new SongView();
$("#container5").html(songView.render().$el); // notice the method chaining




