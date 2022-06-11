const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
require("dotenv").config();
const Person = require("./models/person");
app.use(express.json());
app.use(
    morgan(function (tokens, req, res) {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, "content-length"),
            "-",
            tokens["response-time"](req, res),
            "ms",
            JSON.stringify(req.body),
        ].join(" ");
    })
);
app.use(cors());
app.use(express.static("build"));

app.get("/api/persons", (req, res) => {
    Person.find({})
        .then((result) => {
            res.json(result);
        })
        .catch((e) => {
            console.log(str(e));
        });
});

app.get("/api/persons/:id", (req, res) => {
    Person.findById(req.params.id)
        .then((person) => {
            if (person) {
                res.json(person);
            } else {
                res.status(404).end();
            }
        })
        .catch((e) => {
            console.log(e);
            res.status(500).send({ erro: "bad id" });
        });
});

app.delete("/api/persons/:id", (req, res) => {
    console.log(req.params);
    Person.findByIdAndDelete(req.params.id).then(() => {
        console.log("deleted!");
    });
});
app.post("/api/persons", (req, res) => {
    const body = req.body;
    if (!(body.name && body.number)) {
        return res.status(400).json({
            error: "content missing",
        });
    }
    const person = new Person({
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 9999999),
    });
    person.save().then((savedPerson) => {
        res.json(savedPerson);
    });
});
app.put("/api/persons/:id", (req, res) => {
    console.log(req.params);
    const body = req.body;

    const person = new Person({
        name: body.name,
        number: body.number,
        _id: req.params.id,
    });
    Person.findByIdAndUpdate(req.params.id, person).then(
        (r) => {
            console.log(req.params.id, "updated!");
            res.json(r);
        }
    );
});

app.get("/info", (req, res) => {
    Person.find({})
        .then((result) => {
            res.send(
                `<p>Phonebook has info for ${
                    result.length
                } people <br/>
        ${new Date()}</p>`
            );
        })
        .catch((e) => {
            console.log(str(e));
        });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
