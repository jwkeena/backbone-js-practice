// from model project
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


// begin collection project
console.clear();
const ParkingLot = Backbone.Collection.extend({
    model: Vehicle
});

const parkingLot = new ParkingLot([
    new Car({registrationNumber: "WLHNG", color: "Blue"}),
    new Car({registrationNumber: "ZNP123", color: "Blue"}),
    new Car({registrationNumber: "XUV456", color: "Gray"})
]);

parkingLot.push(subaru);

const blueCars = parkingLot.where({color: "Blue"})
console.log(blueCars);
console.log(parkingLot.findWhere({registrationNumber: "XLI887"}));

parkingLot.remove(parkingLot.findWhere({registrationNumber: "XLI887"}))

console.log(parkingLot.toJSON());

parkingLot.each(car => console.log(car.attributes.registrationNumber));