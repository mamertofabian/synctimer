import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ActiveTimerScreen from "./screens/ActiveTimerScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

const App = () => {
  const activeTimerState = useSelector((state) => state.activeTimerState);
  const { activeTimer } = activeTimerState;

  return (
    <Router>
      <div>
        <Header />
        <main className={`py-3${activeTimer ? " hidden" : ""}`}>
          <Container>
            <h1>Welcome to SharedTimer</h1>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/login" component={LoginScreen} />
          </Container>
        </main>
        <Footer />
        <Route path="/timer" component={ActiveTimerScreen} />
      </div>
    </Router>
  );
};

export default App;
