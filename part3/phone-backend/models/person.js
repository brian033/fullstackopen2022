const mongoose = require("mongoose");

const url = process.env.MONGO_URL;

mongoose
    .connect(url)
    .then((res) => {
        console.log("connected to mongoDB!");
    })
    .catch((error) => {
        console.log(
            "error connecting to mongoDN!",
            error.message
        );
    });

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__V;
    },
});

module.exports = mongoose.model("Person", personSchema);
