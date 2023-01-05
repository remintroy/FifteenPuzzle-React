import React from "react";
import "./Success.css";

function Success({ success, moves, restart }) {
  return (
    <div className={`SuccessDisplay ${success ? "Show" : "Hide"}`}>
      <h1> Great Job !</h1>
      <p>Yout completed this game with {moves} moves</p>
      <div className="BtnCont" onClick={() => restart()}>
        <span className="material-symbols-outlined">refresh</span>
        Replay
      </div>
    </div>
  );
}

export default Success;
