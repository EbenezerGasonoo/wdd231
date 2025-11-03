document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      "id": "cp-1024",
      "name": "cloud processor",
      "averagerating": 4.8
    },
    {
      "id": "mr-2048",
      "name": "machine learning module",
      "averagerating": 4.7
    },
    {
      "id": "db-5120",
      "name": "distributed blockchain node",
      "averagerating": 4.5
    },
    {
      "id": "ai-3072",
      "name": "AI neural network unit",
      "averagerating": 4.4
    },
    {
      "id": "vr-5121",
      "name": "virtual reality headset",
      "averagerating": 4.9
    }
  ];

  function updateProducts(productList) {
    const selectBox = document.getElementById("product-name");

    productList.forEach((product) => {
      const tech = document.createElement("option");
      tech.value = product.averagerating;
      tech.innerText = product.name;
      tech.id = product.id;

      selectBox.appendChild(tech);
    });
  }

  updateProducts(products);

  // Display current year
  const currentyear = document.querySelector("#currentyear");
  const today = new Date();
  currentyear.innerHTML = today.getFullYear();

  // Handle review counter
  if (!localStorage.getItem("reviewcounter")) {
    localStorage.setItem("reviewcounter", 0);
  }

  let currentCounter = parseInt(localStorage.getItem("reviewcounter"), 10);
  currentCounter += 1;
  localStorage.setItem("reviewcounter", currentCounter);

  // Display the review count on the page
  const reviewCount = document.querySelector("#review-count");
  reviewCount.innerText = currentCounter;

  // Show thank you message and hide form, then redirect
  const reviewform = document.getElementById("reviewform");
  reviewform.style.display = "none"; // Hide form after submission
  const thankYouMessage = document.createElement("p");
  thankYouMessage.innerText = "Thank you for your submission!";
  document.body.appendChild(thankYouMessage);

  // Redirect back to the form page after 3 seconds
  setTimeout(() => {
    window.location.href = "index.html"; // Redirect to the form page after 3 seconds
  }, 3000); // Adjust the time as needed

  // Optionally, display the last modified date
  const lastmodified = document.querySelector("#lastModified");
  lastmodified.innerHTML = document.lastModified;
});
