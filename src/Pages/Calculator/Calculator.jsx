import React, { useState } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { getButton } from "../../services/ButtonCalculator";
import Button from "./Button";
import "./Calculator.css";

const Calculator = () => {
  const [buttonList, setButtonList] = useState(getButton());
  return (
    <div className="calculator">
      <div className="calculator-wrapper">
        <input type="text"></input>
        {buttonList.map((btnRow, index) => (
          <div className="row" key={index}>
            {btnRow.map((btn) => (
              <Button className="btn-calc" btn={btn} key={btn.name} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
