const name = "Alain";
const handle = "@alaincodes";

const nameElement = React.createElement("h1", null, name);

const handleElement = React.createElement("h3", null, handle);

const wrapperElement = React.createElement(
  "div",
  { id: "container" },
  nameElement,
  handleElement
);

console.log(wrapperElement);

ReactDOM.render(wrapperElement, document.getElementById("app"));
