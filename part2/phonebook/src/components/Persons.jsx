import React from "react";
import personService from "../services/note";

const Persons = ({ persons, setPersons, setMessage }) => {
    const deleteHandler = (id) => {
        if (!window.confirm("Are u sure about that?"))
            return;
        personService.removePerson(id).catch((e) =>
            setMessage({
                positive: false,
                text: `${id} already deleted on server!`,
            })
        );
        setMessage({
            positive: true,
            text: `Successfully deleted ${id}!`,
        });
        setPersons(
            persons.filter((person) => person.id !== id)
        );
    };
    return (
        <ul>
            {persons.map((person) => {
                return (
                    <li key={person.id} className="note">
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
