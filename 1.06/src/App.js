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
      {/* Buttons  */}
      <Header text="give feedback" />
      <Button text="good" onClick={() => clickHandler(good, setGood)} />
      <Button text="neutral" onClick={() => clickHandler(neutral, setNeutral)} />
      <Button text="bad" onClick={() => clickHandler(bad, setBad)} />
      {/* Statistics */}
      <Header text="statistics" />
      <ListItem text="good" value={good} />
      <ListItem text="neutral" value={neutral} />
      <ListItem text="bad" value={bad} />
    </div>
  )
}

const Header = ({text}) => <h1>{text}</h1>
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const ListItem = ({text, value}) => <div>{text} {value}</div>

export default App