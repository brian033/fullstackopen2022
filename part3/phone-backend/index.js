const express = require("express");
const morgan = require("morgan");
const app = express();
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
persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];

app.get("/api/persons", (req, res) => {
    res.send(persons);
});

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find((p) => p.id === id);
    if (!person) {
        res.status(404).end();
    } else {
        res.json(person);
    }
});

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find((p) => p.id === id);
    if (!person) {
        res.status(404).end();
    } else {
        persons = persons.filter((p) => p.id !== id);
    }
});
app.post("/api/persons", (req, res) => {
    const body = req.body;
    if (!(body.name && body.number)) {
        return res.status(400).json({
            error: "content missing",
        });
    }
    if (persons.find((p) => p.name == body.name)) {
        return res.status(400).json({
            error: "name must be unique",
        });
    }
    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 9999999),
    };
    persons = persons.concat(person);
    res.json(person);
});

app.get("/info", (req, res) => {
    res.send(
        `<p>Phonebook has info for ${
            persons.length
        } people <br/>
        ${new Date()}</p>`
    );
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
