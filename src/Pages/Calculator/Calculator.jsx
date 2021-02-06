import React, { useState } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { evaluate } from "mathjs";
import {
  getButtons,
  isOperator,
  isNumber,
  BUTTONS,
} from "../../services/ButtonCalculator";
import Button from "./Button";
import "./Calculator.css";

const Calculator = () => {
  const [buttonList, setButtonList] = useState(getButtons());
  const [output, setOutput] = useState("0");
  const SortableItem = SortableElement(({ value: btn }) => {
    return (
      <Button
        className={`btn-calc ${
          !isNumber(btn.name) &&
          btn.name !== BUTTONS.DOT &&
          btn.name !== BUTTONS.EQUAL
            ? "notNumber"
            : ""
        }`}
        btn={btn}
        key={btn.name}
        onClick={() => handleClick(btn.name)}
      />
    );
  });

  const SortableList = SortableContainer(({ items }) => {
    return (
      <div className="calculator-wrapper">
        <input type="text" value={output} disabled></input>
        {items.map((btn, index) => (
          <SortableItem
            key={btn.name.toString()}
            value={btn}
            index={index}
          ></SortableItem>
        ))}
      </div>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    let buttonCopy = [...buttonList];
    [buttonCopy[oldIndex], buttonCopy[newIndex]] = [
      buttonCopy[newIndex],
      buttonCopy[oldIndex],
    ];
    setButtonList(buttonCopy);
  };

  const handleClick = (value) => {
    if (isNumber(value)) {
      setOutput((prevState) => {
        if (prevState === "0") return value;
        return prevState + value;
      });
    } else if (value === BUTTONS.DEL) {
      setOutput((prevState) => {
        const result = prevState.slice(0, -1);
        return result === "" ? "0" : result;
      });
    } else if (value === BUTTONS.AC) {
      setOutput("0");
    } else if (isOperator(value)) {
      setOutput((prevState) => {
        if (prevState === "0") return prevState;
        else if (isOperator(prevState.slice(prevState.length - 1)))
          return prevState;
        return prevState + value;
      });
    } else if (value === BUTTONS.EQUAL) {
      setOutput((prevState) => {
        return evaluate(prevState).toString();
      });
    } else if (value === BUTTONS.SQRT) {
      setOutput((prevState) => {
        return parseFloat(evaluate(`sqrt(${prevState})`)).toString();
      });
    } else if (value === BUTTONS.DOT) {
      setOutput((prevState) => {
        if (prevState.includes(value)) return prevState;
        return prevState + value;
      });
    }
  };

  const renderButtons = (items) => {
    return (
      <SortableList
        distance={2}
        items={items}
        onSortEnd={(result) => {
          onSortEnd(result);
        }}
        axis="xy"
      ></SortableList>
    );
  };

  return <div className="calculator">{renderButtons(buttonList)}</div>;
};

export default Calculator;
