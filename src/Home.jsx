import { useEffect, useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Success from "./components/Success/Success";
import Tiles from "./components/Tile/Tile";
import "./Home.css";

function App() {
  const [success, setSuccess] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [data, setData] = useState([]);
  const [movePermission, setMovePermission] = useState(true);

  // generates data for new game
  const randomMatrixGenerator = (matrixSize) => {
    let array = [];
    let output = [];

    // generates correct metrix array
    const generateArray = () => {
      for (let i = 0; i < matrixSize * matrixSize; i++) {
        if (i !== matrixSize * matrixSize - 1) array.push(i + 1);
        else array.push(-1);
      }
    };
    generateArray();

    // randomizes array matrix
    for (let i = 0; i < matrixSize; i++) {
      let carrier = [];
      for (let j = 0; j < matrixSize; j++) {
        carrier.push(
          array.splice(Math.floor(Math.random() * array.length), 1)[0]
        );
      }
      output.push(carrier);
    }

    // return output
    return output;
  };

  const createNewGame = () => {
    setData(randomMatrixGenerator(4));
    setMoveCount(0);
    setSuccess(false);
    setMovePermission(true);
  };

  useEffect(() => {
    createNewGame();
  }, []);

  return (
    <div className="AppMain">
      <Success
        success={success}
        setSuccess={setSuccess}
        moves={moveCount}
        restart={createNewGame}
      />
      <NavBar />
      <Tiles
        success={success}
        setSuccess={setSuccess}
        moveCount={moveCount}
        setMoveCount={setMoveCount}
        data={data}
        setData={setData}
        createNewGame={createNewGame}
        movePermission={movePermission}
        setMovePermission={setMovePermission}
      />
    </div>
  );
}

export default App;
