import React, { useState } from "react";
import "./Tile.css";

function Tile() {
  // TODO: randomise initai data
  const initialData = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, -1, 20],
    [21, 22, 23, 24, 19],
  ];

  const [data, setData] = useState(initialData);
  const [movePermission, setMovePermission] = useState(true);

  const nextMoveDirection = (rowIndex, valueIndex) => {
    // check if clicked tile is empty tile
    if (data[rowIndex][valueIndex] === -1) {
      return [false, `Can't move this tile`];
    }

    const checkIsEmptyNear = (rowIndex, valueIndex) => {
      if (data.length <= rowIndex || rowIndex < 0) return false;
      if (data[rowIndex].length <= valueIndex || valueIndex < 0) return false;
      return data[rowIndex][valueIndex] === -1;
    };

    switch (true) {
      case checkIsEmptyNear(rowIndex, valueIndex - 1): {
        return [rowIndex, valueIndex - 1];
      }
      case checkIsEmptyNear(rowIndex, valueIndex + 1): {
        return [rowIndex, valueIndex + 1];
      }
      case checkIsEmptyNear(rowIndex - 1, valueIndex): {
        return [rowIndex - 1, valueIndex];
      }
      case checkIsEmptyNear(rowIndex + 1, valueIndex): {
        return [rowIndex + 1, valueIndex];
      }
      default: {
        return [false, `Invalid move`];
      }
    }
  };

  // actual move happens here
  const moveTile = (rowIndex, valueIndex, nxtMvRowIndex, nxtMvValueIndex) => {
    const resultData = [];

    data.forEach((value, index) => {
      resultData[index] = [];
      value.forEach((innerValue, innerIndex) => {
        resultData[index][innerIndex] = innerValue;
      });
    });

    // // swapping values
    let temp = resultData[rowIndex][valueIndex];
    resultData[rowIndex][valueIndex] =
      resultData[nxtMvRowIndex][nxtMvValueIndex];
    resultData[nxtMvRowIndex][nxtMvValueIndex] = temp;

    // updating new values to state
    setData(resultData);
  };

  // initiates move
  const manageMove = (value, rowIndex, valueIndex) => {
    // console.log("Clicked => ", value, rowIndex, valueIndex);
    const nextMove = nextMoveDirection(rowIndex, valueIndex);

    // console.log("Next Move : ", nextMove);

    // to prevent any next move
    if (!movePermission) return;

    if (!nextMove[0] && nextMove[0] !== 0) {
      console.log(nextMove[1]);
      return;
    }

    // moves tile
    moveTile(rowIndex, valueIndex, nextMove[0], nextMove[1]);
  };

  return (
    <div className="MainTileContainer">
      <div className="statusDisplay">Nice Move !</div>
      <div className="TileContainer">
        {data.map((row, rowIndex) => {
          return row.map((value, valueIndex) => {
            return (
              <div
                className={value === -1 ? "Empty" : ""}
                onClick={() => manageMove(value, rowIndex, valueIndex)}
                key={value}
              >
                {value === -1 ? "" : value}
              </div>
            );
          });
        })}
      </div>
      <div className="">Nice Move !</div>
    </div>
  );
}

export default Tile;
