// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".buttons button");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const value = button.textContent;

      if (value === "C") {
        display.value = "";
      } else if (value === "=") {
        try {
          const result = new Function(`return ${display.value}`)();
          display.value = result;
        } catch (error) {
          display.value = "Error";
        }
      } else {
        display.value += value;
      }
    });
  });
});
