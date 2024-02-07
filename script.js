const apiKey = "2e9ca48ff0b4491e90c93f5ba27b6eb5"; //https://newsapi.org
const blogContainer = document.querySelector(".blog-container");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");

async function fetchRandomNews() {
  try {
    const apiURL = `https://newsapi.org/v2/everything?q=india&apiKey=${apiKey}`;
    const response = await fetch(apiURL);
    const data = await response.json();
    return data.articles;
  } catch (err) {
    console.error("Error in fetching random news", err);
    return [];
  }
}

searchButton.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (query !== "") {
    try {
      const articles = await fetchNwesQuery(query);
      displayBlogs(articles);
    } catch (err) {
      console.log("Error in fetching news by query", err);
    }
  }
});

async function fetchNwesQuery(query) {
  try {
    const apiURL = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
    const response = await fetch(apiURL);
    const data = await response.json();
    return data.articles;
  } catch (err) {
    console.error("Error in fetching random news", err);
    return [];
  }
}

function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    if (!article.urlToImage) return;
    if (!article.title) return;
    if (!article.description) return;
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;
    const title = document.createElement("h2");
    const truncatedTitle =
      article.title.length > 30
        ? article.title.slice(0, 30) + "..."
        : article.title;
    title.textContent = truncatedTitle;

    const desc = document.createElement("p");
    const truncatedDesc =
      article.description.length > 50
        ? article.description.slice(0, 50) + "..."
        : article.description;
    desc.textContent = truncatedDesc;

    desc.textContent = article.description;
    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(desc);
    blogCard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
    blogContainer.appendChild(blogCard);
  });
}

(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (err) {
    console.error("Error in fetching random news", err);
  }
})();
