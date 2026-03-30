// * select elements
const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");

const twitterBtn = document.getElementById("twitterBtn");
const newQuoteBtn = document.getElementById("newQuoteBtn");

let quotes = [];
// * get quotes from api
async function getQuotes() {
  const apiUrl = "https://dummyjson.com/quotes?limit=100";

  try {
    let apiQuotes = await fetch(apiUrl);
    apiQuotes = await apiQuotes.json();
    quotes = apiQuotes?.quotes || [];

    newQuote();
  } catch (error) {
    console.log(error);
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
