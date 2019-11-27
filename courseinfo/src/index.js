import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({courseName}) => <h1>{courseName}</h1>

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

//parts.map() preferable
const Content = ({parts}) => <div>
  <Part {...parts[0]} />
  <Part {...parts[1]} />
  <Part {...parts[2]} />
</div>

const Total = ({parts}) => <p>Number of exercises { parts.reduce( (sum, {exercises}) => sum + exercises, 0) }</p>

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const parts = [{name: part1, exercises: exercises1}, {name: part2, exercises: exercises2}, {name: part3, exercises: exercises3}]

  return (
    <div>
      <Header courseName={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))