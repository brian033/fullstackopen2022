import React from "react";
import personService from "../services/note";
const PersonForm = ({ props }) => {
    let {
        newName,
        newNumber,
        setNewName,
        setNewNumber,
        persons,
        setPersons,
        setMessage,
    } = props;
    const submitHandler = (event) => {
        event.preventDefault();
        //check if it's already in
        setNewName(newName.trim());
        if (!(newName && newNumber)) {
            setMessage({
                positive: false,
                text: "Please fill in full info!",
            });
            return;
        }
        let dupe = false;
        persons.forEach((person) => {
            if (person.name === newName) {
                dupe = true;
            }
        });
        if (dupe) {
            if (
                !window.confirm(
                    `${newName} is already added to the phonebook, proceed to update it?`
                )
            ) {
                setNewName("");
                setNewNumber("");
                return;
            } else {
                const origPerson = persons.find(
                    (person) => person.name === newName
                );
                if (origPerson.number === newNumber) {
                    setNewName("");
                    setNewNumber("");
                    setMessage({
                        positive: false,
                        text: "Same person + same number!",
                    });
                    return;
                }
                const updatedObj = {
                    ...origPerson,
                    number: newNumber,
                };

                personService
                    .updatePerson(origPerson.id, updatedObj)
                    .then((res) => {
                        setMessage({
                            positive: true,
                            text: `Successfully updated ${newName}!`,
                        });
                        setPersons(
                            persons
                                .filter((person) => {
                                    return (
                                        person.id !==
                                        updatedObj.id
                                    );
                                })
                                .concat([res])
                        );
                    })
                    .catch((e) =>
                        setMessage({
                            positive: false,
                            text: `${updatedObj.name} already deleted on server!`,
                        })
                    );
                setNewName("");
                setNewNumber("");
            }
        } else {
            const newObj = {
                name: newName,
                number: newNumber,
                id: newName,
            };
            personService
                .addPerson(newObj)
                .then((response) => {
                    setPersons((prev) =>
                        prev.concat(response)
                    );
                })
                .catch((e) => console.log(e));
            setMessage({
                positive: true,
                text: `Successfully added ${newName} to the phone book!`,
            });
            setNewName("");
            setNewNumber("");
        }
    };
    return (
        <form onSubmit={submitHandler}>
            <div>
                name:{" "}
                <input
                    value={newName}
                    onChange={(e) =>
                        setNewName(e.target.value)
                    }
                />
            </div>
            <div>
                number:{" "}
                <input
                    value={newNumber}
                    onChange={(e) =>
                        setNewNumber(e.target.value)
                    }
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};

export default PersonForm;
