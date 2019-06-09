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

function ActiveFriends(props) {
  return (
    <div>
      <h2>Active Friends</h2>
      <ul>
        {props.list.map(friend => (
          <li key={friend.name}>
            <span>{friend.name}</span>
            <button onClick={() => props.onRemoveFriend(friend.name)}>
              Remove
            </button>
            <button onClick={() => props.onToggleFriend(friend.name)}>
              Deactivate
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function InactiveFriends(props) {
  return (
    <div>
      <h2>Inactive Friends</h2>
      <ul>
        {props.list.map(friend => (
          <li key={friend.name}>
            <span>{friend.name}</span>
            <button onClick={() => props.onToggleFriend(friend.name)}>
              Activate
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: [
        {
          name: "Jordan",
          active: true
        },
        { name: "MiKenzi", active: true },
        {
          name: "Alice",
          active: false
        }
      ],
      input: ""
    };
  }

  handleAddFriend = () => {
    this.setState(currentState => {
      return {
        friends: currentState.friends.concat([
          {
            name: currentState.input,
            active: true
          }
        ]),
        input: ""
      };
    });
  };

  handleRemoveFriend = name => {
    this.setState(currentState => {
      return {
        friends: currentState.friends.filter(friend => friend.name !== name)
      };
    });
  };

  handleToggleFriend = name => {
    this.setState(currentState => {
      const friend = currentState.friends.find(friend => friend.name === name);
      return {
        friends: currentState.friends
          .filter(friend => friend.name !== name)
          .concat([
            {
              name,
              active: !friend.active
            }
          ])
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
        <div>
          <button
            onClick={() =>
              this.setState({
                friends: []
              })
            }
          >
            Clear All
          </button>
        </div>
        <ActiveFriends
          list={this.state.friends.filter(friend => friend.active === true)}
          onRemoveFriend={this.handleRemoveFriend}
          onToggleFriend={this.handleToggleFriend}
        />
        <InactiveFriends
          list={this.state.friends.filter(friend => friend.active === false)}
          onToggleFriend={this.handleToggleFriend}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
