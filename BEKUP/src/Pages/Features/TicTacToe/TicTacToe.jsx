import React, { useState } from "react";
import Swal from "sweetalert2";
import Button from "../../../components/Button";
import { getButtons, resetButtons } from "./../../../services/ButtonTicTacToe";

import "./TicTacToe.css";

var currentXO = "X";
const TicTacToe = () => {
  const modes = [
    { _id: "SP", name: "SINGLEPLAYER" },
    { _id: "MP", name: "MULTIPLAYER" },
  ];
  const winCondition = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  const [buttonList, setButtonList] = useState(getButtons());
  const [currentMode, setCurrentMode] = useState(modes[0].name);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  const handleSwitchMode = (e) => {
    if (e.target.innerHTML !== currentMode) {
      setCurrentMode(modes.filter((mode) => mode.name !== currentMode)[0].name);
      setButtonList(resetButtons());
      setScore1(0);
      setScore2(0);
    }
  };
  function sweetAlertFire(title) {
    Swal.fire({
      title: title,
      width: 600,
      padding: "3em",
      backdrop: `
      rgba(0,0,123,0.4)
      url("https://sweetalert2.github.io/images/nyan-cat.gif")
      left top
      no-repeat
      `,
      icon: "warning",
      confirmButtonText: "Play Again",
      preConfirm: () => {
        setButtonList(resetButtons());
      },
    });
  }
  function changeXO() {
    if (currentXO === "X") {
      currentXO = "O";
    } else currentXO = "X";
  }
  const singlePlayer = () => {
    const buttonListCopy = [...buttonList];

    const xCondition = [
      ["X", "X", ""],
      ["X", "", "X"],
      ["", "X", "X"],
    ];
    const oCondition = [
      ["O", "O", ""],
      ["O", "", "O"],
      ["", "O", "O"],
    ];
    let arrOfWinCon = [];
    for (let i = 0; i < winCondition.length; i++) {
      let arr = [
        buttonListCopy[winCondition[i][0] - 1].value,
        buttonListCopy[winCondition[i][1] - 1].value,
        buttonListCopy[winCondition[i][2] - 1].value,
      ];

      oCondition.every((con) => {
        if (JSON.stringify(con) === JSON.stringify(arr)) {
          arrOfWinCon = winCondition[i];
          return false;
        }
        return true;
      });
      if (arrOfWinCon.length === 0) {
        xCondition.every((con) => {
          if (JSON.stringify(con) === JSON.stringify(arr)) {
            arrOfWinCon = winCondition[i];
            return false;
          }
          return true;
        });
      }
    }
    let idx = -1;
    arrOfWinCon.every((con) => {
      if (buttonListCopy[con - 1].value === "") {
        idx = con - 1;
        return false;
      }
      return true;
    });
    //USE THE IDX IF FIND ANY MATCHING PATTERN ABOVE
    if (idx !== -1) return handleButtonClick(idx);
    //CHECK IF MID VALUE === "", THEN TAKE THE SLOT
    const midIdx = 4;
    if (buttonListCopy[midIdx].value === "") return handleButtonClick(midIdx);
    //
    //RANDOM
    const listIdx = [];
    for (let i = 0; i < buttonListCopy.length; i++) {
      if (buttonListCopy[i].value === "") {
        listIdx.push(i);
      }
    }
    idx = Math.floor(Math.random() * listIdx.length);
    handleButtonClick(listIdx[idx]);
  };
  const handleButtonClick = (index) => {
    const buttonListCopy = [...buttonList];

    buttonListCopy[index].value = currentXO;
    changeXO();

    const [isWin, player, isEmpty] = checkWin();
    if (isWin) {
      window.setTimeout(() => {
        if (player === 1) {
          setScore1((prevState) => prevState + 1);
          sweetAlertFire(`Player ${player} Won the game!!!`);
        } else {
          setScore2((prevState) => prevState + 1);
          sweetAlertFire(`Player ${player} Won the game!!!`);
        }
        currentXO = "X";
        return;
      }, 800);
    } else if (!isEmpty) {
      sweetAlertFire("Draw");
      currentXO = "X";
      return;
    }

    // MODES CODE
    if (currentMode === "SINGLEPLAYER" && currentXO === "O") {
      window.setTimeout(function () {
        if (!isEmpty) return;
        singlePlayer();
      }, 200);
    }
    setButtonList(buttonListCopy);
  };

  const checkWin = () => {
    let isEmpty = false;
    const buttonListCopy = [...buttonList];
    for (let i = 0; i < winCondition.length; i++) {
      for (let j = 0; j < winCondition[i].length; j++) {
        if (buttonListCopy[winCondition[i][j] - 1].value === "") isEmpty = true;
        if (
          buttonListCopy[winCondition[i][0] - 1].value !==
          buttonListCopy[winCondition[i][j] - 1].value
        ) {
          break;
        }
        if (j === 2 && buttonListCopy[winCondition[i][j] - 1].value !== "") {
          return [
            true,
            buttonListCopy[winCondition[i][j] - 1].value === "X" ? 1 : 2,
            0,
          ];
        }
      }
    }
    return [false, 0, isEmpty];
  };
  return (
    <div className="tictactoe-wrapper">
      <div className="mode-select">
        {modes.map((mode) => (
          <Button
            key={mode._id}
            name={mode.name}
            btn={mode}
            className={`mode-btn ${
              currentMode === mode.name ? "active-mode" : ""
            }`}
            onClick={handleSwitchMode}
          ></Button>
        ))}
      </div>
      <div className="score-board">
        <div className="score1">{score1}</div>
        <div className="score-score">-</div>
        <div className="score2">{score2}</div>
      </div>
      <div className="board">
        {buttonList.map(({ value }, index) => (
          <Button
            key={index}
            className={`tictactoe-btn ${
              value === "" ? "active-tictactoe-btn" : ""
            }`}
            value={value}
            onClick={value === "" ? () => handleButtonClick(index) : null}
          />
        ))}
      </div>
    </div>
  );
};

export default TicTacToe;
