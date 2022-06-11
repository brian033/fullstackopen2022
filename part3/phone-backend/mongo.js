const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log(
        "Please provide the password as an argument: node mongo.js <password> (<name> <number>)"
    );
    process.exit(1);
}

const [, , password, name, number] = process.argv;
const url = `mongodb+srv://user-briandickass:${password}@testdb.nyq6v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url);
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model("Person", personSchema);

if (name && number) {
    //add new entry
    const person = new Person({
        name,
        number,
    });

    person.save().then((result) => {
        console.log(
            `added ${name} number ${number} to phonebook`
        );
        mongoose.connection.close();
    });
} else {
    //datas
    Person.find({})
        .then((result) => {
            console.log("phonebook:");
            result.forEach((res) => {
                console.log(`${res.name} ${res.number}`);
            });
            mongoose.connection.close();
        })
        .catch((e) => {
            console.log(str(e));
        });
}
