import React from "react";
import Styles from "./App.module.scss";
import World from "./library/world/World";
import UI from "./library/ui/UI";

function App() {
  return (
    <div className={Styles.App}>
      <World />
      <UI />
    </div>
  );
}

export default App;
