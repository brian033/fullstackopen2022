import React from "react";
import personService from "../services/note";

const Persons = ({ persons, setPersons }) => {
    const deleteHandler = (id) => {
        if (!window.confirm("Are u sure about that?"))
            return;
        personService
            .removePerson(id)
            .catch((e) => console.log(e));
        setPersons(
            persons.filter((person) => person.id !== id)
        );
    };
    return (
        <ul>
            {persons.map((person) => {
                return (
                    <li key={person.id}>
                        {person.name} {person.number}{" "}
                        <button
                            onClick={() =>
                                deleteHandler(person.id)
                            }
                        >
                            delete
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

export default Persons;
