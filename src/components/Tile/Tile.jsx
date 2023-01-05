import React, { useEffect, useState } from "react";
import "./Tile.css";
import { LevelA } from "../../const";

function Tile({
  setSuccess,
  moveCount,
  setMoveCount,
  movePermission,
  setMovePermission,
  data,
  setData,
}) {
  const [status, setStatus] = useState("");

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
        return [false, `Invalid move :(`];
      }
    }
  };

  const checkWin = (completed, current) => {
    // compares each element in finished and current arrays for a unmatch
    for (let i = 0; i < completed.length; i++) {
      for (let j = 0; j < completed[i].length; j++) {
        // check for unmatch
        if (completed[i][j] !== current[i][j]) {
          return false;
        }
      }
    }
    // 2 matrix's match completely
    return true;
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
    setMoveCount((currentCount) => currentCount + 1);
  };

  // works on each move !
  useEffect(() => {
    // check for win
    if (moveCount > 0) {
      const winned = checkWin(LevelA, data);
      setSuccess(winned);
      if (winned) setMovePermission(false);
    }
  }, [data]);

  // initiates move
  const manageMove = (rowIndex, valueIndex, event) => {
    // console.log("Clicked => ", value, rowIndex, valueIndex);
    const nextMove = nextMoveDirection(rowIndex, valueIndex);

    // console.log("Next Move : ", nextMove);

    // to prevent any next move
    if (!movePermission) return;

    if (!nextMove[0] && nextMove[0] !== 0) {
      setStatus(nextMove[1]);
      return;
    }

    // moves tile
    moveTile(rowIndex, valueIndex, nextMove[0], nextMove[1]);
    setStatus("Keep Going !");
  };

  return (
    <div className="MainTileContainer">
      <div className="statusDisplay">{status ? status : ":)"}</div>
      <div className="TileContainer">
        {data.map((row, rowIndex) => {
          return row.map((value, valueIndex) => {
            return (
              <div
                className={`${value === -1 ? "Empty" : ""} ${
                  value !== -1 && value === LevelA[rowIndex][valueIndex]
                    ? "Done"
                    : ""
                }`}
                onClick={(event) => manageMove(rowIndex, valueIndex, event)}
                key={value}
              >
                {value === -1 ? "" : value}
              </div>
            );
          });
        })}
      </div>
      <div className="Move Count mt-4"> {moveCount} Moves</div>
    </div>
  );
}

export default Tile;
