// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".buttons button");

  const operators = ["+", "-", "*", "/", "."];

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const value = button.textContent.trim();
      const lastChar = display.value.slice(-1);

      if (value === "C") {
        // Clear display
        display.value = "";
      } 
      else if (value === "=") {
        if (display.value.trim() === "") return; // prevent empty eval
        try {
          display.value = new Function(`return ${display.value}`)();
        } catch (error) {
          display.value = "Error";
        }
      } 
      else {
        // Prevent consecutive operators (e.g., ++, **, etc.)
        if (operators.includes(value) && operators.includes(lastChar)) {
          return; // skip adding this operator
        }
        display.value += value;
      }
    });
  });
});

// Keyboard support
window.addEventListener("keydown", (e) => {
  const key = e.key;
  const display = document.getElementById("display");

  const active = document.activeElement;
  if (active &&
      (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.isContentEditable) &&
      active.id !== "display") {
    return;
  }
  const operators = ["+", "-", "*", "/", "."]; // same as above
  const lastChar = display.value.slice(-1);
  // Evaluate on Enter or '='
  if (key === "Enter" || key === "=") {
    e.preventDefault();
    if (display.value.trim() === "") return;
    try {
      display.value = new Function(`return ${display.value}`)();
    } catch {
      display.value = "Error";
    }
    return;
  }

  // Backspace: delete last character
  if (key === "Backspace") {
    e.preventDefault();
    display.value = display.value.slice(0, -1);
    return;
  }

  // Clear on Escape or Delete
  if (key === "Escape" || key === "Delete") {
    e.preventDefault();
    display.value = "";
    return;
  }
});
