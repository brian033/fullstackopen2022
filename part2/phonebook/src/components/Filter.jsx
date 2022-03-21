import React from "react";

const Filter = ({ props }) => {
    let { searchResult, setSearchResult, persons } = props;
    const search = (e) => {
        setSearchResult(
            persons.filter((person) =>
                person.name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            )
        );
    };
    return (
        <div>
            filter shown with <input onChange={search} />
            {searchResult && (
                <ul>
                    {searchResult.map((person) => {
                        return (
                            <li key={person.id}>
                                {person.name}{" "}
                                {person.number}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default Filter;
