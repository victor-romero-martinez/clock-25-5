import "./App.css";
import Clock from "./components/clock";
import Title from "./components/title";
import ClockProvider from "./context/clockProvider";

function App() {
  return (
    <>
      <Title />
      <ClockProvider>
        <Clock />
      </ClockProvider>
    </>
  );
}

export default App;
