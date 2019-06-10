// State and Lifecycle

// function tick() {
//   const element = (
//     <div>
//       <h1>Hello, World!</h1>
//       <h2>It is {new Date().toLocaleTimeString()}.</h2>
//     </div>
//   );
//   ReactDOM.render(element, document.getElementById("app"));
// }

// setInterval(tick, 1000);

// function Clock(props) {
//   return (
//     <div>
//       <h1>Hello, World!</h1>
//       <h2>It is {props.date.toLocaleTimeString()}.</h2>
//     </div>
//   );
// }

// function tick() {
//   ReactDOM.render(<Clock />, document.getElementById("app"));
// }

// setInterval(tick, 1000);

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  // Lifecyle methods componentDidMount and componentWillUnmount
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, World</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById("app"));
