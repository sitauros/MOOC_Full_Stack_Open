import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickHandler = (value, setValue) => {
    setValue(value + 1)
  }

  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" onClick={() => clickHandler(good, setGood)} />
      <Button text="neutral" onClick={() => clickHandler(neutral, setNeutral)} />
      <Button text="bad" onClick={() => clickHandler(bad, setBad)} />
      <Header text="statistics" /> 
      <Statistics good={good} neutral={neutral} bad={bad}  />
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const getAll = () => good + neutral + bad
  const getAverage = () => good + (bad * -1)
  const getPositivePercentile = () => (100 * good / getAll()) + " %"

  return (
    getAll() === 0 ?
      <div>No Feedback Given</div>
    :
    <>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} /> 
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={getAll()} />
          <StatisticLine text="average" value={getAverage()} />
          <StatisticLine text="positive" value={getPositivePercentile()} />
        </tbody>
      </table>
    </>
  )
}

const Header = ({text}) => <h1>{text}</h1>
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
} 

export default App