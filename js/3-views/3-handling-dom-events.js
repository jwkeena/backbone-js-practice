// basic event handler
const Song = Backbone.Model.extend();
const SongView = Backbone.View.extend({
    events: {
        "click": "onClick", // note the key value pairs are jquery selectors, and functions defined in this view. So to prevent the TEXT from being clickable, put "click button", since that selects only buttons
        "click .loop": "onClickLoop"
    },
    onClick() {
        console.log("Playing " + this.model.get("title"))
    },
    onClickLoop(event) {
        event.stopPropagation(); // Prevents event bubbling, triggering other click method
        console.log("Playing " + this.model.get("title") + " forever nonstop");
    },
    render() {
        this.$el.html(this.model.get("title") + " <button>Listen</button>" + " <button class='loop'>Loop</button>");
        return this;
    }
});

const song = new Song({title: "Don't Stop Me Now"});
const songView = new SongView({el: "#container", model: song});

songView.render();
