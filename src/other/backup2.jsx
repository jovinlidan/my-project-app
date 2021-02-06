import React, { useState } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { getButton, isOperator } from "../../services/ButtonCalculator";
import Button from "./Button";
import "./Calculator.css";

const Calculator = () => {
  const [buttonList, setButtonList] = useState(getButton());

  const SortableItem = SortableElement(({ value: btn }) => {
    return (
      <Button
        className={`btn-calc ${isOperator(btn.name) ? "operator" : ""}`}
        btn={btn}
        key={btn.name}
        onClick={(result) => console.log(result)}
      />
    );
  });

  const SortableList = SortableContainer(({ items }) => {
    return items.map((btnRow, index) => (
      <div className="row" key={index}>
        {btnRow.map((btn, index) => (
          <SortableItem
            key={btn.name.toString()}
            value={btn}
            index={index}
          ></SortableItem>
        ))}
      </div>
    ));
  });

  const renderButton = () => {};

  return (
    <div className="calculator">
      <div className="calculator-wrapper">
        <input type="text" disabled></input>
        <SortableList
          items={buttonList}
          onSortEnd={(result) => {
            console.log(result);
          }}
          axis="xy"
        ></SortableList>
      </div>
    </div>
  );
};

export default Calculator;
