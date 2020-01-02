// vehicle model
const Vehicle = Backbone.Model.extend();

// view for vehicle model
const ParkingSpot = Backbone.View.extend({
    tagName: "li",
    events: {
        "click .delete": "clickDeleteButton"
    },
    clickDeleteButton() {
        const numberToMatch = this.model.get("registrationNumber");
        const collectionToFind = this.model.collection; // this way I don't have to know the name of the collection in advance
        collectionToFind.remove(collectionToFind.where({registrationNumber: numberToMatch})) // remove the model linked to the dom element clicked from the collection. This triggers an event in the collection
        console.log("sending car to the junkyard");
    },
    render() {
        // without template
        this.$el.html(this.model.get("registrationNumber") + " <button class='delete'>Delete</button>");
        this.$el.attr("data-color", this.model.get("color"));
        this.$el.css("color", this.model.get("color"));
        this.$el.attr("id", this.model.get("id"));
        return this;
    }
});

// collection of vehicles
const Garage = Backbone.Collection.extend({
    model: Vehicle
});

// creates views for each model in the collection of vehicles
const GarageView = Backbone.View.extend({
    tagName: "ul",
    initialize() {
        this.model.on("remove", this.remove, this); // attach event listener for when the delete button is clicked
    },
    remove(vehicle) {
        this.$el.find("li#" + vehicle.id).remove(); // remove html element from the page that corresponds to the model just deleted from the collection
        console.log("car is in the junkyard");
    },
    render() {
        console.log("opening garage");
        this.model.each(vehicle => {
            const parkingSpot = new ParkingSpot({model: vehicle});
            this.$el.append(parkingSpot.render().$el)
        })
    }
});

const garage = new Garage([
    new Vehicle({registrationNumber: 123456, color: "red", id: 1}),
    new Vehicle({registrationNumber: 789100, color: "blue", id: 2}),
    new Vehicle({registrationNumber: 484634, color: "yellow", id: 3}),
    new Vehicle({registrationNumber: 568234, color: "violet", id: 4}),
    new Vehicle({registrationNumber: 832354, color: "lawngreen", id: 5}),
    new Vehicle({registrationNumber: 111234, color: "goldenrod", id: 6})
]);

const garageView = new GarageView({el: "#container", model: garage}).render();
const test = 1;