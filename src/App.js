import { BrowserRouter as Router } from "react-router-dom";
import Root from "./components/Root";

function App() {
  return (
    <div className="App">
      <Router>
        <Root />
      </Router>
    </div>
  );
}

export default App;
