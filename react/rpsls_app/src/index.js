import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Choice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      choice_id: this.props.choice_id
    }
  }

  render() {
    return (
      <button className="choice">
        {this.state.name}
      </button>
    );
  }
}

class Choices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      choices: [],
      player_choice: null,
      computer_choice: null,
      play_outcome: null
    }
  }

  componentDidMount() {
    fetch('http://localhost:5000/choices').then(res => res.json()).then(
      (result) => {
        this.setState({
          isLoaded: true,
          choices: result
        });
      }, 
      (error) => {
        this.setState({
          isLoaded: true,
          error: error
        });
      }
    )
  }

  renderChoice(name, choice_id) {
    return <Choice name={name} choice_id={choice_id} key={name}/>;
  }

  render() {
    const { error, isLoaded, choices } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading</div>
    } else {
      return (
        <div>
          Please make a choice selection below:
          <br></br>
          {choices.map(choice => (
            this.renderChoice(choice.name, choice.choice_id)
          ))}
          {this.renderChoice('random')}
          <br></br>
          You have selected {this.state.player_choice} and the computer selected {this.state.computer_choice}. 
          You {this.state.play_outcome}!
        </div>
      );
    }
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <Choices />
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

