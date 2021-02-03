import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import React, { Component } from "react";
import { Form } from "react-bootstrap";
import Button from "./Button";
import "./Calculator.css";
class Calculator extends Component {
  state = {
    output: "",
    lastValue: "",
    sign: "",
  };

  OPERATOR = {
    PLUS: "+",
    MINUS: "-",
    TIMES: "x",
    DIVISION: "/",
    EQUAL: "=",
    DELETE: "Del",
  };
  buttonList = [
    { value: 9 },
    { value: 8 },
    { value: 7 },
    { value: 6 },
    { value: 5 },
    { value: 4 },
    { value: 3 },
    { value: 2 },
    { value: 1 },
    { value: 0 },
    { value: this.OPERATOR.EQUAL, styles: { gridColumn: "2/span 2" } },
  ];
  calcByOperator = (op, val1, val2) => {
    switch (op) {
      case this.OPERATOR.PLUS:
        return (val1 + val2).toString();
      case this.OPERATOR.MINUS:
        return (val1 - val2).toString();
      case this.OPERATOR.DIVISION:
        return (val1 / val2).toString();
      case this.OPERATOR.TIMES:
        return (val1 * val2).toString();
      default:
        return "Error";
    }
  };
  operator = (value) => {
    if (this.state.sign === "") {
      this.setState({
        lastValue: this.state.output,
        sign: value,
      });
    } else {
      this.setState((prevState) => ({
        output: this.calcByOperator(
          this.state.sign,
          parseFloat(this.state.output),
          parseFloat(this.state.lastValue)
        ),
        sign: value,
      }));
    }
  };
  handleNumber = (value) => {
    if (this.state.sign !== "") {
      this.setState({
        lastValue: this.state.output,
        output: "",
      });
    }

    this.setState((prevState) => ({
      output: prevState.output === "0" ? "" : prevState.output + value,
    }));
  };
  handleClick = (value) => {
    if (Number.isInteger(value)) {
      this.handleNumber(value);
    } else if (value === this.OPERATOR.DELETE) {
      this.setState((prevState) => ({
        output: prevState.output.slice(0, -1),
      }));
    } else if (value === this.OPERATOR.EQUAL) {
      if (this.state.sign !== "") {
        this.setState({
          equalSignTrigger: this.state.sign,
          equalLastValueTrigger: this.state.output,
        });
      }
      this.setState((prevState) => ({
        output:
          this.state.sign !== ""
            ? this.calcByOperator(
                this.state.sign,
                parseFloat(this.state.lastValue),
                parseFloat(this.state.output)
              )
            : this.calcByOperator(
                this.state.equalSignTrigger,
                parseFloat(this.state.output),
                parseFloat(this.state.equalLastValueTrigger)
              ),
        sign: "",
        lastValue: "",
      }));
    } else {
      this.operator(value);
    }
  };

  handleMouseDown = () => {
    window.setTimeout(() => {
      this.setState({
        output: "0",
        sign: "",
        lastValue: "",
        equalLastValueTrigger: "",
        equalSignTrigger: "",
      });
    }, 500);
  };

  render() {
    return (
      <div className="calculator">
        <div className="calculator-body shadow">
          <div className="top-body">
            <Form.Control
              type="text"
              className="result"
              placeholder="0"
              value={this.state.output}
              readOnly
            />
          </div>

          <div className="bot-body">
            <div className="list-button-num">
              {this.buttonList.map((btn) => (
                <Button
                  key={btn.value.toString() + btn.value.toString()}
                  value={btn.value}
                  styles={btn.styles}
                  onClick={() => this.handleClick(btn.value)}
                />
              ))}
            </div>
            <div className="list-button-op">
              <Button
                value={this.OPERATOR.DELETE}
                onClick={() => this.handleClick(this.OPERATOR.DELETE)}
                onMouseDown={this.handleMouseDown}
              />
              <Button
                value={this.OPERATOR.PLUS}
                onClick={() => this.handleClick(this.OPERATOR.PLUS)}
              />
              <Button
                value={this.OPERATOR.MINUS}
                onClick={() => this.handleClick(this.OPERATOR.MINUS)}
              />
              <Button
                value={this.OPERATOR.TIMES}
                onClick={() => this.handleClick(this.OPERATOR.TIMES)}
              />
              <Button
                value={this.OPERATOR.DIVISION}
                onClick={() => this.handleClick(this.OPERATOR.DIVISION)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Calculator;
