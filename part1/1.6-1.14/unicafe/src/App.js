import { useState } from "react";
const Button = ({ text, onClick }) => {
    return <button onClick={onClick}>{text}</button>;
};
const StatisticsLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    );
};
const Statistics = ({
    good,
    bad,
    neutral,
    getAll,
    getAvg,
}) => {
    return (
        <>
            {getAll() > 0 ? (
                <table>
                    <tbody>
                        <tr>
                            <th>statistics</th>
                        </tr>
                        <StatisticsLine
                            text="good"
                            value={good}
                        />
                        <StatisticsLine
                            text="neutral"
                            value={neutral}
                        />
                        <StatisticsLine
                            text="bad"
                            value={bad}
                        />
                        <StatisticsLine
                            text="all"
                            value={getAll()}
                        />
                        <StatisticsLine
                            text="average"
                            value={getAvg()}
                        />
                        <StatisticsLine
                            text="positive"
                            value={
                                (good / getAll()) * 100 +
                                "%"
                            }
                        />
                    </tbody>
                </table>
            ) : (
                <p>No feedback given</p>
            )}
        </>
    );
};
const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const getAll = () => {
        return good + neutral + bad;
    };
    const getAvg = () => {
        return (good - bad) / getAll();
    };
    return (
        <div>
            <h1>give feedback</h1>
            <Button
                text="good"
                onClick={() => setGood((p) => p + 1)}
            />
            <Button
                text="neutral"
                onClick={() => setNeutral((p) => p + 1)}
            />
            <Button
                text="bad"
                onClick={() => setBad((p) => p + 1)}
            />
            <Statistics
                good={good}
                bad={bad}
                neutral={neutral}
                getAvg={getAvg}
                getAll={getAll}
            />
        </div>
    );
};

export default App;
