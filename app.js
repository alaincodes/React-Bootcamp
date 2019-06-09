// const name = "Alain";
// const handle = "@alaincodes";

// function NameComponent(props) {
//   return <h1>{props.name}</h1>;
// }

// function HandleComponent(props) {
//   return <h3>{props.handle}</h3>;
// }

// function App() {
//   return (
//     <div id="container">
//       <NameComponent name={name} />
//       <HandleComponent handle={handle} />
//     </div>
//   );
// }

// ReactDOM.render(<App />, document.getElementById("app"));

function FriendsList(props) {
  return (
    <ul>
      {props.list.map(name => (
        <li key={name}>
          <span>{name}</span>
          <button onClick={() => props.onRemoveFriend(name)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: ["Jordyn", "Mikenzi", "Jake"],
      input: ""
    };
  }

  handleAddFriend = () => {
    this.setState(currentState => {
      return {
        friends: currentState.friends.concat([this.state.input]),
        input: ""
      };
    });
  };

  handleRemoveFriend = name => {
    this.setState(currentState => {
      return {
        friends: currentState.friends.filter(friend => friend !== name)
      };
    });
  };

  updateInput = e => {
    const value = e.target.value;

    this.setState({ input: value });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="new friend"
          value={this.state.input}
          onChange={this.updateInput}
        />
        <button onClick={this.handleAddFriend}>Submit</button>
        <FriendsList
          list={this.state.friends}
          onRemoveFriend={this.handleRemoveFriend}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
