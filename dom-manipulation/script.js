// Load quotes from local storage or initialize an empty array
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "Success is not final; failure is not fatal.", category: "Motivation" },
  { text: "Life is what happens when you’re busy making other plans.", category: "Life" },
];

document.addEventListener("DOMContentLoaded", function() {
  populateCategories();
  filterQuotes(); // Load last filter
});

// Function to populate the category dropdown dynamically
function populateCategories() {
  let categoryFilter = document.getElementById("categoryFilter");
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  let uniqueCategories = [...new Set(quotes.map(q => q.category))];
  uniqueCategories.forEach(category => {
      let option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
  });

  // Restore last selected filter
  let savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory) {
      categoryFilter.value = savedCategory;
  }
}

// Function to filter quotes based on the selected category
function filterQuotes() {
  let selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selectedCategory); // Save filter preference

  let filteredQuotes = selectedCategory === "all" ? quotes : quotes.filter(q => q.category === selectedCategory);

  let quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";
  
  filteredQuotes.forEach(quote => {
      let p = document.createElement("p");
      p.textContent = `"${quote.text}" - ${quote.category}`;
      quoteDisplay.appendChild(p);
  });
}

// Function to add a new quote
function addQuote() {
  let newQuoteText = document.getElementById("newQuoteText").value.trim();
  let newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      localStorage.setItem("quotes", JSON.stringify(quotes)); // Save to local storage
      populateCategories();
      filterQuotes();
  }
}

// Function to export quotes as a JSON file
document.getElementById("exportQuotes").addEventListener("click", function() {
  let dataStr = JSON.stringify(quotes, null, 2);
  let blob = new Blob([dataStr], { type: "application/json" });
  let url = URL.createObjectURL(blob);

  let a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      localStorage.setItem("quotes", JSON.stringify(quotes));
      populateCategories();
      filterQuotes();
      alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}
