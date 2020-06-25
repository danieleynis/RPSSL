import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Choice extends React.Component {
  render() {
    return (
      <button className="choice">
        {this.props.value}
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
      choices: []
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

  renderChoice(name) {
    return <Choice value={name}/>;
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
          {choices.map(choice => (
            this.renderChoice(choice.name)
          ))}
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

