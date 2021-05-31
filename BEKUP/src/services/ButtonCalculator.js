// const button = [
//   [{ name: "AC" }, { name: "%" }, { name: "√x" }, { name: "DEL" }],
//   [{ name: 7 }, { name: 8 }, { name: 9 }, { name: "*" }],
//   [{ name: 4 }, { name: 5 }, { name: 6 }, { name: "÷" }],
//   [{ name: 1 }, { name: 2 }, { name: 3 }, { name: "-" }],
//   [{ name: "." }, { name: 0 }, { name: "=" }, { name: "+" }],
// ];
export const BUTTONS = {
  EQUAL: "=",
  ADD: "+",
  SUBTRACT: "-",
  DIVISION: "/",
  AC: "AC",
  DEL: "DEL",
  SQRT: "√x",
  DOT: ".",
  MOD: "%",
  MULTIPLY: "*",
};
const buttons = [
  { name: BUTTONS.AC },
  { name: BUTTONS.MOD },
  { name: BUTTONS.SQRT },
  { name: BUTTONS.DEL },
  { name: "7" },
  { name: "8" },
  { name: "9" },
  { name: BUTTONS.MULTIPLY },
  { name: "4" },
  { name: "5" },
  { name: "6" },
  { name: BUTTONS.DIVISION },
  { name: "1" },
  { name: "2" },
  { name: "3" },
  { name: BUTTONS.SUBTRACT },
  { name: BUTTONS.DOT },
  { name: "0" },
  { name: BUTTONS.EQUAL },
  { name: BUTTONS.ADD },
];

export function getButtons() {
  return buttons;
}
export function isOperator(value) {
  return (
    value === BUTTONS.MULTIPLY ||
    value === BUTTONS.SUBTRACT ||
    value === BUTTONS.ADD ||
    value === BUTTONS.DIVISION ||
    value === BUTTONS.MOD
  );
}
export function isNumber(value) {
  return !isNaN(value);
}
