const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");

// Get from localStorage
function getChapterList() {
  return JSON.parse(localStorage.getItem("bomChapters")) || [];
}

// Save to localStorage
function setChapterList() {
  localStorage.setItem("bomChapters", JSON.stringify(chaptersArray));
}

// Display a chapter list item
function displayList(item) {
  const li = document.createElement("li");
  li.textContent = item;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";

  deleteBtn.addEventListener("click", () => {
    deleteChapter(li.textContent);
    list.removeChild(li);
  });

  li.appendChild(deleteBtn);
  list.appendChild(li);
}

// Delete chapter logic
function deleteChapter(chapter) {
  chapter = chapter.slice(0, chapter.length - 1); // remove ❌
  chaptersArray = chaptersArray.filter((item) => item !== chapter);
  setChapterList();
}

// Load saved chapters
let chaptersArray = getChapterList();
chaptersArray.forEach(chapter => displayList(chapter));

// Add new chapter
button.addEventListener("click", () => {
  const chapter = input.value.trim();

  if (chapter === "") {
    alert("Please enter a book and chapter.");
    input.focus();
    return;
  }

  displayList(chapter);
  chaptersArray.push(chapter);
  setChapterList();

  input.value = "";
  input.focus();
});
