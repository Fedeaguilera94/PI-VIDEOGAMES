import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom"; // importo
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import GameCreated from "./components/GameCreated";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/creategame" component={GameCreated} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
