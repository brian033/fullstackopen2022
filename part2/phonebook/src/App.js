import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import axios from "axios";
const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [searchResult, setSearchResult] = useState("");
    useEffect(() => {
        axios
            .get("http://localhost:3001/persons")
            .then((res) => {
                setPersons(res.data);
            })
            .catch((e) => console.log(e));
    }, []);
    return (
        <div>
            <h2>Phonebook</h2>
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
                }}
            />
            <h2>Numbers</h2>
            <Persons persons={persons} />
        </div>
    );
};

export default App;
