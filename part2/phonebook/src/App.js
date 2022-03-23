import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/note";
import Message from "./components/Message";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [searchResult, setSearchResult] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        personService
            .getAll()
            .then((data) => {
                setPersons(data);
            })
            .catch((e) => console.log(e));
    }, []);
    return (
        <div>
            <h2>Phonebook</h2>
            <Message
                message={message}
                setMessage={setMessage}
            />
            <Filter
                props={{
                    searchResult,
                    setSearchResult,
                    persons,
                }}
            />
            <h2>add a new</h2>
            <PersonForm
                props={{
                    newName,
                    newNumber,
                    setNewName,
                    setNewNumber,
                    persons,
                    setPersons,
                    setMessage,
                }}
            />
            <h2>Numbers</h2>
            <Persons
                persons={persons}
                setPersons={setPersons}
                setMessage={setMessage}
            />
        </div>
    );
};

export default App;
