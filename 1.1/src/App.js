const App = () => {
  const course = "Half Stack application development"
  const parts = {
    1: {name: "Fundamentals of React", exercises: 10},
    2: {name: "Using props to pass data", exercises: 7},
    3: {name: "State of a component", exercises: 14}
  }
  const total = parts[1].exercises + parts[2].exercises + parts[3].exercises

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={total} />
    </div>
  )
}

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  return (
    <>
      <p>
        {props.parts[1].name} {props.parts[1].exercises}
      </p>
      <p>
        {props.parts[2].name} {props.parts[2].exercises}
      </p>
      <p>
        {props.parts[3].name} {props.parts[3].exercises}
      </p>
    </>
  )
}

const Total = (props) => {
  return <p>Number of exercises {props.total}</p>
}

export default App