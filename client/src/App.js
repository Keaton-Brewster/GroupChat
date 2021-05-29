import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./Pages/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </Router>
  );
}

export default App;
