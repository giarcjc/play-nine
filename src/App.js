import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import './App.css';

const Star = () => {
  return (<FontAwesomeIcon icon={faStar} className='fa-star'/>)
}


const Stars = (props) => {
  const numberOfStars = 1 + Math.floor(Math.random() * 9);
  const arrayOfStars = Array.from({ length: numberOfStars}, (_, i) => i);

  return (
    <div className="col-5">
			{
        arrayOfStars.map(i => {
          return (<Star key={i}/>)
        })
      }
    </div>
  )
}

const Button = (props) => {
  return (
    <div className="col-2"	>
      <button>=</button>
    </div>
  )
}

const Answer = (props) => {
  return (
    <div className="col-5">
      { props.selectedNumbers.map((number, i) =>
        <span key={i}>{number}</span>
      )}</div>
  )
}

const Numbers = (props) => {
  const numberClassName = (number) => {
    if (props.selectedNumbers.indexOf(number) > -1) {
        return 'selected';
    }
  }
	return (
  	<div className="card text-center">
  	  <div>
  	    { Numbers.list.map((number, i) =>
          <span key={i} className={numberClassName(number + 1)}>{number + 1}</span>
        )}
  	  </div>
  	</div>
  )
}

Numbers.list = Array.from({ length: 9}, (_, i) => i);

class Game extends React.Component {
  state = {
    selectedNumbers: [2,4]
  }


  render() {
    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr />
					<div className="row">
            <Stars />
            <Button />
            <Answer selectedNumbers={this.state.selectedNumbers}/>
          </div>
          <br />
	        <Numbers selectedNumbers={this.state.selectedNumbers}/>
			</div>
    )
  }
}
class App extends React.Component {
  render() {
    return (
      <Game />
    );
  }
}

export default App;
