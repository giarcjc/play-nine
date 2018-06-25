import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import './App.css';

const Star = () => {
  return (<FontAwesomeIcon icon={faStar} className='fa-star'/>)
}

const Check = () => {
  return (<FontAwesomeIcon icon={faCheck} className='fa-check'/>)
}

const XTimes = () => {
  return (<FontAwesomeIcon icon={faTimes} className='fa-times'/>)
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
  let button;

  switch (props.answerIsCorrect) {
    case true:
      button = <button className="btn btn-success">
      <Check />
      </button>
      break;
    case false:
      button = <button className="btn btn-danger">
      <XTimes />
      </button>
      break;
    default:
      button = <button className="btn"
      onClick={props.checkAnswer}
      disabled={props.selectedNumbers.length === 0}>
        =
        </button>
      break;
  }

  return (
    <div className="col-2"	>
      {button}
    </div>
  )
}

const Answer = (props) => {
    console.log('Answer.. props.selectedNumbers: ');
    console.log( props.selectedNumbers);
  return (
    <div className="col-5">
      { props.selectedNumbers.map((number, i) =>
        <span key={i} onClick={() => {props.unselectNumber(number)}}>{number}</span>
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
    answerIsCorrect: null,
  }

  selectNumber = (clickedNumber) => {
    console.log('clickedNumber: ');
    console.log(clickedNumber);
    if (this.state.selectedNumbers.indexOf(clickedNumber) > -1 ) { return;}
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  };


  unselectNumber = (clickedNumber) => {
    this.setState((prevState) => ({
      selectedNumbers: prevState.selectedNumbers
                                .filter(number => number !== clickedNumber)
    }));
  };

  checkAnswer = () => {
    console.log('checkAnswer');

    // normally we don't place any value that can be calculated on the state, this is demo only
    // num stars equals the sum of the selected number values
    this.setState(prevState => ( {
      answerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
    }))
  }

  render() {
    const {selectedNumbers,  numberOfStars, answerIsCorrect} = this.state;
    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr />
					<div className="row">
            <Stars numberOfStars={numberOfStars}/>
            <Button selectedNumbers={selectedNumbers}
                    checkAnswer={this.checkAnswer}
                    answerIsCorrect={answerIsCorrect}
                     />
            <Answer selectedNumbers={selectedNumbers}
                     unselectNumber={this.unselectNumber}/>
          </div>
          <br />
	        <Numbers selectedNumbers={selectedNumbers}
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
