import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import './App.css';

const Star = () => {
  return (<FontAwesomeIcon icon={faStar} />)
}


const Stars = (props) => {
	const numberOfStars = 1 + Math.floor(Math.random() * 9);
  const starArray = [];
  for (let i=0; i<numberOfStars; i++) {
    starArray.push(<Star key={i}/>)
  }

  return (
    <div className="col-5">
			{starArray}
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
    <div className="col-5">...</div>
  )
}

const Numbers = (props) => {
	return (
  	<div className="card text-center">
  	  <div>
  	    <span>1</span>
        <span className="selected">2</span>
        <span className="used">3</span>
  	  </div>
  	</div>
  )
}

class Game extends React.Component {
  render() {
    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr />
					<div className="row">
            <Stars />
            <Button />
            <Answer />
          </div>
          <br />
	        <Numbers />
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
