import React from "react";

const PersonForm = ({ props }) => {
    let {
        newName,
        newNumber,
        setNewName,
        setNewNumber,
        persons,
        setPersons,
    } = props;
    const submitHandler = (event) => {
        event.preventDefault();
        //check if it's already in
        let original = JSON.stringify(persons);
        if (original.includes(newName)) {
            setNewName("");
            return alert(
                `${newName} is already added to the phonebook`
            );
        }
        if (!(newName && newNumber)) {
            return alert("Please fill in full info!");
        }
        const newObj = {
            name: newName,
            number: newNumber,
            id: persons.length + 1,
        };
        setPersons((prev) => prev.concat(newObj));
        setNewName("");
        setNewNumber("");
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
