import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";

// import NavBar from "./components/navBar";
import VehicleInfoSignals from "./components/vehicleInfoSignals";
import SignalForm from "./components/signalForm";
import NotFound from "./components/notFound";

function App() {
  return (
    <React.Fragment>
      {/* <NavBar /> */}
      <main className="container">
        <Switch>
          <Route path="/vehicleSignals/:id" component={SignalForm}></Route>
          <Route path="/vehicleSignals" component={VehicleInfoSignals}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" exact to="/vehicleSignals" />
          {/* <Redirect to="not-found" /> */}
        </Switch>
      </main>
    </React.Fragment>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <Counter />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <span>
//           <span>Learn </span>
//           <a
//             className="App-link"
//             href="https://reactjs.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             React
//           </a>
//           <span>, </span>
//           <a
//             className="App-link"
//             href="https://redux.js.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Redux
//           </a>
//           <span>, </span>
//           <a
//             className="App-link"
//             href="https://redux-toolkit.js.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Redux Toolkit
//           </a>
//           ,<span> and </span>
//           <a
//             className="App-link"
//             href="https://react-redux.js.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             React Redux
//           </a>
//         </span>
//       </header>
//     </div>
//   );
// }

export default App;
