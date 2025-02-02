// Initialize quotes array from local storage or default data
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "Success is not final, failure is not fatal.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
];

// Function to display a random quote
function showRandomQuote() {
  if (quotes.length === 0) return;
  const randomIndex = Math.floor(Math.random() * quotes.length);
  document.getElementById("quoteDisplay").textContent = quotes[randomIndex].text;
}

document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Function to add a new quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text && category) {
    quotes.push({ text, category });
    localStorage.setItem("quotes", JSON.stringify(quotes));
    alert("Quote added!");
    populateCategories();
  }
}

// Function to populate categories dynamically
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  
  const categories = [...new Set(quotes.map(q => q.category))];
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

document.getElementById("categoryFilter").addEventListener("change", filterQuotes);

// Function to filter quotes by category
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const filteredQuotes = selectedCategory === "all" ? quotes : quotes.filter(q => q.category === selectedCategory);
  document.getElementById("quoteDisplay").textContent = filteredQuotes.length ? filteredQuotes[0].text : "No quotes available.";
  localStorage.setItem("selectedCategory", selectedCategory);
}

// Function to export quotes as JSON
function exportQuotes() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "quotes.json";
  link.click();
}

document.getElementById("exportQuotes").addEventListener("click", exportQuotes);

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    localStorage.setItem("quotes", JSON.stringify(quotes));
    alert("Quotes imported successfully!");
    populateCategories();
  };
  fileReader.readAsText(event.target.files[0]);
}

document.getElementById("importFile").addEventListener("change", importFromJsonFile);

// Function to sync with a mock server (simulated with local storage)
function syncWithServer() {
  fetch("https://jsonplaceholder.typicode.com/posts") // Replace with actual API
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("serverQuotes", JSON.stringify(data.slice(0, 5))); // Mock sync
      alert("Synced with server!");
    })
    .catch(error => console.error("Sync failed:", error));
}

document.getElementById("syncServer").addEventListener("click", syncWithServer);

// Load stored quotes and categories on page load
window.onload = () => {
  showRandomQuote();
  populateCategories();
  document.getElementById("categoryFilter").value = localStorage.getItem("selectedCategory") || "all";
  filterQuotes();
};
