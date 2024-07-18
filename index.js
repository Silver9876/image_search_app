const accessKey = "M3AS9K4vuR0YKSEzwZSglGSLxbhm91Y-MpheSEEhZBw";
const formE1 = document.querySelector("form");
const inputE1 = document.getElementById("search-input"); // Assuming this is the search input
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputE1.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  // Assuming 'photos' is the correct property for image results
  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = ""; // Clear previous results only on first page
  }

  results.map(result => {
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add("search-result");

    const image = document.createElement('img');
    image.src = result.urls.small;
    image.alt=result.alt_description;
    const imageLink = document.createElement('a');
    imageLink.href = result.links.html; // Assuming 'links' is the property for the image URL
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });

  page++;
  if (page > 1) {
    showMore.style.display = "block";
  } else {
    showMore.style.display = "none"; // Hide 'show more' if on first page
  }
}

formE1.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1; // Reset page for new searches
  searchImages();
});

showMore.addEventListener("click", () => {
  // Implement pagination logic here (e.g., using data from the API response)
  // You can check if there are more pages available or fetch new results based on page number
  searchImages();
});

