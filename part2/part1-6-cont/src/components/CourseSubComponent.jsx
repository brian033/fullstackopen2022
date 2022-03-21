import React from "react";

const CourseSubComponent = ({ course }) => {
    const { id, name, parts } = course;
    const getSum = (a) => {
        const sumWithInitial = a.reduce(
            (accumulator, currentValue) => {
                return accumulator + currentValue.exercises;
            },
            0
        );
        return sumWithInitial;
    };
    return (
        <li>
            <h3>{name}</h3>
            <ul>
                {parts.map((c) => {
                    return (
                        <li key={c.id}>
                            {c.name} {c.exercises}
                        </li>
                    );
                })}
            </ul>
            <h4>total of {getSum(parts)} exercises</h4>
        </li>
    );
};

export default CourseSubComponent;
