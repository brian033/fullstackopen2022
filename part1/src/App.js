const Header = (props) => {
    let { course } = props;
    return <h1>{course}</h1>;
};
const Part = (props) => {
    const { index, name, numbers } = props;
    return (
        <p key={index.toString()} id={index.toString()}>
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
                        name={line[0]}
                        numbers={line[1]}
                        index={index}
                    />
                );
            })}
        </div>
    );
};
const Total = (props) => {
    let { sum } = props;
    return <p>Number of exercises {sum}</p>;
};

const App = () => {
    const course = "Half Stack application development";
    const part1 = "Fundamentals of React";
    const exercises1 = 10;
    const part2 = "Using props to pass data";
    const exercises2 = 7;
    const part3 = "State of a component";
    const exercises3 = 14;

    return (
        <div>
            <Header course={course} />
            <Content
                data={[
                    [part1, exercises1],
                    [part2, exercises2],
                    [part3, exercises3],
                ]}
            />
            <Total
                sum={exercises1 + exercises2 + exercises3}
            />
        </div>
    );
};

export default App;
