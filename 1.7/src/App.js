import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickHandler = (value, setValue) => {
    setValue(value + 1)
  }

  const getAll = () => good + neutral + bad
  const getAverage = () => good + (bad * -1)
  const getPositivePercentile = () => getAll() === 0 ? "N/A" : (100 * good / getAll()) + " %"

  return (
    <div>
      {/* Buttons  */}
      <Header text="give feedback" />
      <Button text="good" onClick={() => clickHandler(good, setGood)} />
      <Button text="neutral" onClick={() => clickHandler(neutral, setNeutral)} />
      <Button text="bad" onClick={() => clickHandler(bad, setBad)} />
      {/* Statistics */}
      <Header text="statistics" />
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={getAll()} />
      <Statistic text="average" value={getAverage()} />
      <Statistic text="positive" value={getPositivePercentile()} />
    </div>
  )
}

const Header = ({text}) => <h1>{text}</h1>
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const Statistic = ({text, value}) => <div>{text} {value}</div>

export default App