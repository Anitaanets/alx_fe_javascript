document.addEventListener("DOMContentLoaded", function () {
  // Array of quotes with categories
  let quotes = [
      { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Motivation" },
      { text: "Do what you can, with what you have, where you are.", category: "Inspiration" },
      { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
      { text: "Creativity is intelligence having fun.", category: "Creativity" }
  ];

  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  const newQuoteText = document.getElementById("newQuoteText");
  const newQuoteCategory = document.getElementById("newQuoteCategory");
  const addQuoteBtn = document.querySelector("button[onclick='addQuote()']");

  // Function to show a random quote
  function showRandomQuote() {
      if (quotes.length === 0) {
          quoteDisplay.textContent = "No quotes available.";
          return;
      }
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomIndex];
      quoteDisplay.textContent = `"${randomQuote.text}" - Category: ${randomQuote.category}`;
  }

  // Function to add a new quote
  function addQuote() {
      const quoteText = newQuoteText.value.trim();
      const quoteCategory = newQuoteCategory.value.trim();

      if (quoteText === "" || quoteCategory === "") {
          alert("Please enter both quote text and category.");
          return;
      }

      quotes.push({ text: quoteText, category: quoteCategory });
      newQuoteText.value = "";
      newQuoteCategory.value = "";
      alert("Quote added successfully!");
  }

  // Attach event listeners
  newQuoteBtn.addEventListener("click", showRandomQuote);
  addQuoteBtn.addEventListener("click", addQuote);

  // Show an initial random quote on page load
  showRandomQuote();
});
