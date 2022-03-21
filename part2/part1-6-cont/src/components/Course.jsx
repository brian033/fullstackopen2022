import React from "react";
import CourseSubComponent from "./CourseSubComponent";
const Course = ({ courses }) => {
    return (
        <ul>
            {courses.map((course) => {
                return (
                    <CourseSubComponent
                        course={course}
                        key={course.id}
                    />
                );
            })}
        </ul>
    );
};

export default Course;
