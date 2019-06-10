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

window.API = {
  fetchPopularRepos(language = "all") {
    const encodedURI = encodeURI(
      `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
    );
    return fetch(encodedURI)
      .then(data => data.json())
      .then(repos => repos.items)
      .catch(error => {
        console.warn(error);
        return null;
      });
  }
};

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Loading"
    };
  }
  componentDidMount() {
    const stopper = this.state.text + "...";
    this.interval = window.setInterval(() => {
      this.state.text === stopper
        ? this.setState(() => ({ text: "Loading" }))
        : this.setState(prevState => ({ text: prevState.text + "." }));
    }, 300);
  }
  componentWillUnmount() {
    window.clearInterval(this.interval);
  }
  render() {
    return <p>{this.state.text}</p>;
  }
}
function RepoGrid(props) {
  return (
    <ul style={{ display: "flex", flexWrap: "wrap" }}>
      {props.repos.map(({ name, owner, stargazers_count, html_url }) => (
        <li key={name} style={{ margin: 30 }}>
          <ul>
            <li>
              <a href={html_url}>{name}</a>
            </li>
            <li>@{owner.login}</li>
            <li>{stargazers_count} stars</li>
          </ul>
        </li>
      ))}
    </ul>
  );
}
function Nav(props) {
  const languages = ["all", "javascript", "ruby", "python"];
  return (
    <nav>
      <ul>
        {languages.map(lang => (
          <li key={lang} onClick={() => props.onSelectLanguage(lang)}>
            {lang}
          </li>
        ))}
      </ul>
    </nav>
  );
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      activeLanguage: "all",
      loading: true
    };
    this.handleSelectLanguage = this.handleSelectLanguage.bind(this);
    this.fetchRepos = this.fetchRepos.bind(this);
  }
  componentDidMount() {
    this.fetchRepos(this.state.activeLanguage);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeLanguage !== this.state.activeLanguage) {
      this.fetchRepos(this.state.activeLanguage);
    }
  }
  fetchRepos(lang) {
    this.setState({
      loading: true
    });
    window.API.fetchPopularRepos(lang).then(data => {
      this.setState({
        loading: false,
        repos: data
      });
    });
  }
  handleSelectLanguage(lang) {
    this.setState({
      activeLanguage: lang
    });
  }
  render() {
    return (
      <div>
        <Nav onSelectLanguage={this.handleSelectLanguage} />
        {this.state.loading === true ? (
          <Loading />
        ) : (
          <div>
            <h1 style={{ textAlign: "center" }}>{this.state.activeLanguage}</h1>
            <RepoGrid repos={this.state.repos} />
          </div>
        )}
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));
