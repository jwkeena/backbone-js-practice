const Song = Backbone.Model.extend();
const SongView = Backbone.View.extend({
    render() {
        // the following inline html can be extracted into a template script in the index.html page
        // this.$el.html(this.model.get("title") + " <button>Listen</button>"); 
        
        // using the template defined in the script tag in the html file
        const template = _.template($("#songTemplate").html()); // using jquery selector to get the script tag, and extracting its markup; then using underscore's _.template method to convert the markup to a template function
        const html = template(this.model.toJSON()); // passing a JSON representation of the model to be rendered into the underscore template function just created (since underscore expects JSON, not a backbone model)
        this.$el.html(html); // injecting the filled in template into the view to be rendered
        return this;
    }
})

const song = new Song({title: "Bohemian Rhapsody", plays: 1050});
const songView = new SongView({el: "#container", model: song}).render();