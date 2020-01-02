// Model event listeners are, strangely, not attached to the models themselves but to the model property of the views. 
// But that's because the view is the go-between of the model and the DOM
const Videogame = Backbone.Model.extend({
    defaults: {
        players: 0
    },
});

const GameView = Backbone.View.extend({
    initialize() { // attach event listener to view as soon as it's created
        this.model.on("change", this.render, this); 
        // In order: 
        // this.model: we are trying to attach an event listener to the model property of the view, not to the model itself
        // .on: the jquery event listener
        // "change": all backbone models publish a change event whenever one of their attributes are changed
        // this.render: callback to fire whenever the change event is triggered. Notice how it could be changed below
        // this: sets the context to the view itself when the render method is called; otherwise, the context would be set to the (instantiated?) model.
    },
    render() { // this method could be called anything. the thing that makes it render is just the line putting html in an element
        this.$el.html(this.model.get("title") + " - Players: " + this.model.get("players"));
        return this;
    }
});

const videogame = new Videogame({title: "Tetris Effect"});
const gameView = new GameView({el: "#container", model: videogame});
gameView.render();

// now use the console to change the players attribute and watch it update:
// videogame.attributes("players", 100);