const buttons = [
  { value: "" },
  { value: "" },
  { value: "" },
  { value: "" },
  { value: "" },
  { value: "" },
  { value: "" },
  { value: "" },
  { value: "" },
];

export function getButtons() {
  return buttons;
}

export function resetButtons() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].value = "";
  }
  return buttons;
}
