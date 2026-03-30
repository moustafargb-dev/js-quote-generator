// * select elements
const quoteContainerEl = document.getElementById("quoteContainer");
const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const loaderEl = document.getElementById("loader");
const twitterBtn = document.getElementById("twitterBtn");
const newQuoteBtn = document.getElementById("newQuoteBtn");

let quotes = [];
// * loading functions
function showLoadingSpinner() {
  loaderEl.classList.remove("d-none");
  quoteContainerEl.classList.add("d-none");
}
function removeLoadingSpinner() {
  loaderEl.classList.add("d-none");
  quoteContainerEl.classList.remove("d-none");
}

// * get quotes from api
async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = "https://dummyjson.com/quotes?limit=100";

  try {
    let apiQuotes = await fetch(apiUrl);
    apiQuotes = await apiQuotes.json();
    quotes = apiQuotes?.quotes || [];

    newQuote();
    removeLoadingSpinner();
  } catch (error) {
    console.log("Error", error);
    quotes = localQuotes;
    newQuote();
    removeLoadingSpinner();
  }
}

// * show random quote
function newQuote() {
  const { quote, author } = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.textContent = quote;
  authorEl.textContent = author;

  if (quote.length > 120) quoteEl.classList.add("quote-long");
  else quoteEl.classList.remove("quote-long");
}

// * tweet the quote
function tweetQuote() {
  let tweetApi = `https://twitter.com/intent/tweet?text=${quoteEl.textContent} - ${authorEl.textContent}`;

  window.open(tweetApi);
}

// * event listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// * on load
getQuotes();
