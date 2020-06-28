import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Container } from 'react-bootstrap';

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
      <>
        <Button variant='secondary' onClick={this.props.onClick}>
          {this.state.name}
        </Button>{' '}
      </>
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

  playChoice(choice_id) {
    fetch('http://localhost:5000/play', {  //https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player: choice_id })
    }).then(res => res.json()).then(
        (result) => {
          this.setState({
            player_choice: this.trandlateChoiceIdToName(result.player),
            computer_choice: this.trandlateChoiceIdToName(result.computer),
            play_outcome: result.results
          })
        }
    );
  }

  handleChoiceSelection(choice_id) {
    if (choice_id === 0) {
      fetch('http://localhost:5000/choice').then(res => res.json()).then(
        (result) => {
          choice_id = result.id;
        }
      ).then(() => this.playChoice(choice_id));
    } else {
      this.playChoice(choice_id);
    }
  }

  trandlateChoiceIdToName(choice_id) {
    for (const choice of this.state.choices) {
      if (choice.id === choice_id) 
        return choice.name;
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
    return <Choice name={name} choice_id={choice_id} key={name} onClick={() => this.handleChoiceSelection(choice_id)}/>;
  }

  render() {
    const { error, isLoaded, choices } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading</div>
    } else {
      return (
        <Container>
          <div>
            Please make a choice selection below:
            <br></br>
            {choices.map(choice => (
              this.renderChoice(choice.name, choice.id)
            ))}
            {this.renderChoice('random', 0)}
            <br></br>
            You have selected {this.state.player_choice} and the computer selected {this.state.computer_choice}. 
            You {this.state.play_outcome}!
          </div>
        </Container>
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

