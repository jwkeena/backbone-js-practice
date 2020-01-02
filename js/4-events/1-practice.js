// Basic custom event
const person = {
    name: "Justin",
    walk() {
        this.trigger("walking"); // the trigger method publishes events
    }
};

_.extend(person, Backbone.Events);

person.on("walking", () => console.log("Person is walking")); // subscribe to an event


// More complicated example
const alien = {
    name: "Stitch",
    freakHumansOut() {
        this.trigger("disturbing", {
            speed: 10,
            startTime: "8:00:00am"
        })
    },
    abduct() {
        this.trigger("abduct");
    }
}

_.extend(alien, Backbone.Events);

alien.on("disturbing", e => console.log("Alien is disturbing people.", e)); // subscribe to event
alien.off("disturbing"); // unsubscribe from event. If event name is not specified, all events will be unsubscribed from this object
alien.once("abduct", () => console.log("Alien has abducted you and you can't be abducted again. Just try it")); // an event that only triggers once and is removed
