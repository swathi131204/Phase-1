import React, { Component } from "react";

class Greeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Hello from a class component!"
    };
  }

  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Greeting />
      </div>
    );
  }
}

export default App;

