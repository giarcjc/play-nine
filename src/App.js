import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import './App.css';

const Star = () => {
  return (<FontAwesomeIcon icon={faStar} className='fa-star'/>)
}


const Stars = (props) => {
  const arrayOfStars = Array.from({ length: props.numberOfStars}, (_, i) => i);

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
    console.log('Answer.. props.selectedNumbers: ');
    console.log( props.selectedNumbers);
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
          <span key={i} className={numberClassName(number + 1)}
          onClick={() => props.selectNumber(number + 1)}
          >{number + 1}</span>
        )}
  	  </div>
  	</div>
  )
}

Numbers.list = Array.from({ length: 9}, (_, i) => i);

class Game extends React.Component {
  state = {
    selectedNumbers: [],
    numberOfStars: 1 + Math.floor(Math.random() * 9),
  }

  selectNumber = (clickedNumber) => {
    console.log('clickedNumber: ');
    console.log(clickedNumber);
    if (this.state.selectedNumbers.indexOf(clickedNumber) > -1 ) { return;}
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    })
    )

  };

  render() {
    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr />
					<div className="row">
            <Stars numberOfStars={this.state.numberOfStars}/>
            <Button />
            <Answer selectedNumbers={this.state.selectedNumbers}/>
          </div>
          <br />
	        <Numbers selectedNumbers={this.state.selectedNumbers}
          selectNumber={this.selectNumber}
          />
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
