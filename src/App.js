import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCheck, faTimes, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import './App.css';



var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};


const Star = () => {
  return (<FontAwesomeIcon icon={faStar} className='fa-star'/>)
}

const Check = () => {
  return (<FontAwesomeIcon icon={faCheck} className='fa-check'/>)
}

const XTimes = () => {
  return (<FontAwesomeIcon icon={faTimes} className='fa-times'/>)
}

const Refresh = () => {
  return (<FontAwesomeIcon icon={faSyncAlt} className='fa-refresh'/>)
}


const DoneFrame = (props) => {
  return (
    <div className="text-center">
      <h2>{props.doneStatus}</h2>
      <button
        className="btn btn-secondary"
        onClick={props.resetGame}>
          Play Again
      </button>
    </div>
    )
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
      button = <button className="btn btn-success" onClick={props.acceptAnswer}>
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
    <div className="col-2 text-center">
      <br />
      <br />
      {button}
      <button className="btn btn-warning btn-small"
              onClick={props.redraw}
              disabled={props.redraws < 1}>
        <Refresh />
        <br />
        {props.redraws}
      </button>
    </div>
  )
}

const Answer = (props) => {
    // console.log('Answer.. props.selectedNumbers: ');
    // console.log( props.selectedNumbers);
  return (
    <div className="col-5">
      { props.selectedNumbers.map((number, i) =>
        <span key={i}
              onClick={() => props.unselectNumber(number)}>
                {number}
        </span>
      )}
    </div>
  )
}

const Numbers = (props) => {
  const numberClassName = (number) => {
    if (props.usedNumbers.indexOf(number) > -1) {
        return 'used';
    }
    if (props.selectedNumbers.indexOf(number) > -1) {
      return 'selected';
    }
  }
	return (
  	<div className="card text-center">
  	  <div>
  	    { Numbers.list.map((number, i) =>
          <span key={i}
                className={numberClassName(number)}
                onClick={() => props.selectNumber(number)}>
                  {number}
          </span>
        )}
  	  </div>
  	</div>
  )
}

Numbers.list = [...Array(9).keys()].map(i => i + 1);

class Game extends React.Component {
  static randomNumber = () => 1 + Math.floor(Math.random() * 9);
  static initialState = () => ({
    selectedNumbers: [],
    numberOfStars: Game.randomNumber(),
    answerIsCorrect: null,
    usedNumbers: [],
    redraws: 5,
    doneStatus: null
});

  state = Game.initialState();

  resetGame = () => this.setState(Game.initialState());

  selectNumber = (clickedNumber) => {
    if (this.state.selectedNumbers.indexOf(clickedNumber) > -1 ) { return; }
      this.setState(prevState => ({
        answerIsCorrect: null,
        selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
      }));
  };

  unselectNumber = (clickedNumber) => {
    this.setState((prevState) => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers
                                .filter(number => number !== clickedNumber)
    }));
  };

  checkAnswer = () => {
    // normally we don't place any value that can be calculated on the state, this is demo only
    // num stars equals the sum of the selected number values
    this.setState(prevState => ( {
      answerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers
        .reduce((acc, n) => acc + n, 0)
    }));
  };

  acceptAnswer = () => {
    this.setState(prevState => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      answerIsCorrect: null,
      numberOfStars: Game.randomNumber(),
    }), this.updateDoneStatus);

  };


  redraw = () => {
    if (this.state.redraws === 0) {
      return;
    }
    this.setState(prevState => ({
      selectedNumbers: [],
      answerIsCorrect: null,
      numberOfStars: Game.randomNumber(),
      redraws: prevState.redraws - 1,
    }), this.updateDoneStatus);
  }

  possibleSolutions = ({numberOfStars, usedNumbers}) => {
    const possibleNumbers = [...Array(9).keys()].map(i => i + 1)
      .filter(number => usedNumbers.indexOf(number) === -1);

    return possibleCombinationSum(possibleNumbers, numberOfStars);
  };

  updateDoneStatus = () => {
    this.setState(prevState => {
      if (prevState.usedNumbers.length === 9) {
        return { doneStatus: 'Done. Nice!'};
      }
      if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
        return { doneStatus: 'Game Over!'}
      }
    });
  }

  render() {
    const {
        selectedNumbers,
        numberOfStars,
        answerIsCorrect,
        usedNumbers,
        redraws,
        doneStatus
      } = this.state;

    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr />
					<div className="row">
            <Stars numberOfStars={numberOfStars}/>
            <Button selectedNumbers={selectedNumbers}
                    checkAnswer={this.checkAnswer}
                    answerIsCorrect={answerIsCorrect}
                    acceptAnswer={this.acceptAnswer}
                    redraws={redraws}
                    redraw={this.redraw}

                     />
            <Answer selectedNumbers={selectedNumbers}
                     unselectNumber={this.unselectNumber}/>
          </div>
          <br />
          { doneStatus ?  <DoneFrame doneStatus={doneStatus}/> :
              <Numbers  selectedNumbers={selectedNumbers}
                        selectNumber={this.selectNumber}
                        usedNumbers={usedNumbers}/>
          }
			</div>
    );
  };
};

class App extends React.Component {
  render() {
    return (
      <div>
        <Game />
      </div>
    );
  };
};

export default App;
