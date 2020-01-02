var Vehicle = Backbone.Model.extend({
    initialize() {
        console.log("New vehicle manufactured.")
    },
    defaults: {
        start: function() {
            console.log("Vehicle started.");
        }
    },
    validate: function(attrs) {
        if (!attrs.registrationNumber)
            return "Registration number is required.";
    },
    urlRoot: "/api/vehicles"
});

var Car = Vehicle.extend({
    start: function() {
        console.log(`Car with registration number ${this.get('registrationNumber')} started.`);
        
    }
});

var subaru = new Car({
    registrationNumber: "XLI887",
    color: "Blue"
});

subaru.unset("registrationNumber");
console.log(subaru.isValid());
console.log(subaru.validationError);
subaru.set("registrationNumber", "XLI887");
console.log(subaru.isValid());

subaru.start();


