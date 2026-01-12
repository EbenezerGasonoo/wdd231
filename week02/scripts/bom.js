
const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");

button.addEventListener("click", () => {
  

  if (input.value.trim() === "") {
    alert("Please enter a book and chapter.");
    input.focus(); // Send focus back to input field
    return; // Stop function if input is empty
  }

  const listItem = document.createElement("li");

  const deleteBtn = document.createElement("button");

  listItem.textContent = input.value;

  deleteBtn.textContent = "❌";

  listItem.appendChild(deleteBtn);

  list.appendChild(listItem);

  deleteBtn.addEventListener("click", () => {
    list.removeChild(listItem);
  });

  input.focus();

  input.value = "";
});
