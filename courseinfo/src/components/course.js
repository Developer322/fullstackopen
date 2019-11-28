import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => <h1>{course}</h1>

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Content = ({parts}) => <div>
  {parts.map( part => <Part {...part} key={part.id} /> )}
</div>

const Total = ({parts}) => <p><b>{`total of ${parts.reduce( (sum, {exercises}) => sum + exercises, 0)} exercises`}</b></p>

const Course = (course) => {

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course