const baseURL = "https://ebenezergasonoo.github.io/wdd231/";
const linksURL = "https://ebenezergasonoo.github.io/wdd231/data/links.json";

async function getLinks() {
  try {
    const response = await fetch(linksURL);
    const data = await response.json();
    displayLinks(data.weeks);
  } catch (error) {
    console.error("Error fetching links:", error);
  }
}

function displayLinks(weeks) {
  const learningList = document.querySelector("#activities-list");

  if (!learningList) return; // Exit if element doesn't exist

  weeks.forEach((weekObj) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `${weekObj.week}: `;

    weekObj.links.forEach((link, index) => {
      const a = document.createElement("a");
      a.href = link.url.startsWith("http") ? link.url : baseURL + link.url;
      a.textContent = link.title;
      a.target = "_blank";
      listItem.appendChild(a);

      // Add separator if not the last link
      if (index < weekObj.links.length - 1) {
        listItem.appendChild(document.createTextNode(" | "));
      }
    });

    learningList.appendChild(listItem);
  });
}

getLinks();
