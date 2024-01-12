import { useState } from "react";

const FeedBackButton = ({ handleClick, label }) => {
  return <button onClick={handleClick}>{label}</button>;
};

const StatisticLine = ({ label, feedBack }) => (
  <tr>
    <td>{label}</td>
    <td>{feedBack}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <tr>
        <td>No FeedBack Given</td>
      </tr>
    );
  }
  // Can't Tell If it's better to keep the logic tied to statistics here, because passing the
  //Values is kinda weird, but idk
  const TotalFeedBack = () => {
    return good + neutral + bad;
  };
  const AverageFeedBack = () => {
    return (good - bad) / (good + bad + neutral);
  };

  const PositiveFeedBack = () => {
    const percentage = (good / (good + bad + neutral)) * 100;
    return percentage + "%";
  };

  return (
    <>
      <StatisticLine label="Total " feedBack={TotalFeedBack()} />
      <StatisticLine label="Average " feedBack={AverageFeedBack()} />
      <StatisticLine label="Positive " feedBack={PositiveFeedBack()} />
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>How was your visit Today?</h1>
      <FeedBackButton handleClick={() => setGood(good + 1)} label="Good" />
      <FeedBackButton
        handleClick={() => setNeutral(neutral + 1)}
        label="Neutral"
      />
      <FeedBackButton handleClick={() => setBad(bad + 1)} label="Bad" />
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine label="Good " feedBack={good} />
          <StatisticLine label="Neutral " feedBack={neutral} />
          <StatisticLine label="Bad " feedBack={bad} />
          <Statistics good={good} neutral={neutral} bad={bad} />
        </tbody>
      </table>
    </div>
  );
};

export default App;
