const Header = (props) => {
    let { course } = props;
    return <h1>{course}</h1>;
};
const Part = (props) => {
    const { index, name, numbers } = props;
    return (
        <p key={index}>
            {name} {numbers}
        </p>
    );
};
const Content = (props) => {
    let { data } = props;
    return (
        <div>
            {data.map((line, index) => {
                return (
                    <Part
                        name={line.name}
                        numbers={line.exercises}
                        index={index}
                    />
                );
            })}
        </div>
    );
};
const Total = (props) => {
    let { data } = props;
    let sum = 0;
    data.forEach((p) => (sum += p.exercises));
    return <p>Number of exercises {sum}</p>;
};

const App = () => {
    const course = {
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10,
            },
            {
                name: "Using props to pass data",
                exercises: 7,
            },
            {
                name: "State of a component",
                exercises: 14,
            },
        ],
    };

    return (
        <div>
            <Header course={course.name} />
            <Content data={course.parts} />
            <Total data={course.parts} />
        </div>
    );
};

export default App;
