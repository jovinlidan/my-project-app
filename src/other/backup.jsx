import React, { Component } from "react";
import { Form } from "react-bootstrap";
import "./Calculator.css";
class Calculator extends Component {
  OPERATOR = {
    PLUS: "+",
    MINUS: "-",
    TIMES: "x",
    DIVISION: "/",
    EQUAL: "=",
    DELETE: "Del",
  };
  state = {
    output: "",
    lastValue: "",
    sign: "",
    buttonList: [
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
      { value: "Del", isOp: true },
      { value: "+", isOp: true },
      { value: "-", isOp: true },
      { value: "x", isOp: true },
      { value: "/", isOp: true },
    ],
  };

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

  handleMouseDown = (e) => {
    if (e.target.innerText !== this.OPERATOR.DELETE) return;
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

  handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const items = Array.from(this.state.buttonList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    this.setState({ buttonList: items });
  };
  renderButton = (type) => {
    const { buttonList } = this.state;
    return buttonList.map((btn, index) => {
      return (
        !btn.isOp === (type === "NUMBER") && (
          <div
            className={"btn btn-primary" + (index === 10 ? " span2" : "")}
            onClick={() => this.handleClick(btn.value)}
          >
            {btn.value}
          </div>
        )
      );
    });
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
            <div className="list-button-num">{this.renderButton("NUMBER")}</div>
            <div className="list-button-op">
              {this.renderButton("OPERATOR")}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Calculator;
