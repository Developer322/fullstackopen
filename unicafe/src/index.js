import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const ButtonsBlock = ({caption, buttons}) => 
    <div>
        <h1>{caption}</h1>
        {buttons.map( (button) => <Button {...button} />)}
    </div>

const Statistic = ({text, value, measurements}) => <tr> <th>{text}</th> <th>{`${value}${measurements ? measurements : ''}`}</th> </tr>

const Statistics = ({caption, stats}) => {
    if(!stats.find( (mark) => mark.value)){
        return(<>
            <h1>{caption}</h1>
            <div>No feedback given</div>
        </>)
    }
    return(
        <>
            <h1>{caption}</h1>
            <table>
                {stats.map( (stat) => <Statistic {...stat} />)}
            </table>
        </>)
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const buttonsInfo = {
    caption:'give feedback',
    buttons: [
      {
          text: 'good', 
          handleClick: () => setGood(good + 1)
      },
      {
          text: 'neutral', 
          handleClick: () => setNeutral(neutral + 1)
      },
      {
          text: 'bad', 
          handleClick: () => setBad(bad + 1)
      }
    ]
}

  const statInfo = {
    caption:'statistics',
    stats:[
        {
            text: 'good', 
            value: good
        },
        {
            text: 'neutral', 
            value: neutral
        },
        {
            text: 'bad', 
            value: bad
        },
        {
            text: 'all',
            value: (good+neutral+bad)
        },
        {
            text: 'average',
            value: (good || neutral || bad) ? ((good-bad)/(good+neutral+bad)) : 0
        },
        {
            text: 'positive',
            value: (good || neutral || bad) ? (good/(good+neutral+bad)) : 0,
            measurements: ' %'
        }
    ]
  }


  return (
    <div>
      <ButtonsBlock {...buttonsInfo} />
      <Statistics {...statInfo}  /> 
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)