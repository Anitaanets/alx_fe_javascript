// Load quotes from local storage or use default ones
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Perseverance" },
  { text: "Believe you can and you're halfway there.", category: "Belief" }
];

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to show a random quote
function showRandomQuote() {
  if (quotes.length === 0) return;
  
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Save last viewed quote to session storage
  sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));

  document.getElementById("quoteDisplay").innerHTML = `
      <p>"${randomQuote.text}"</p>
      <small>- ${randomQuote.category}</small>
  `;
}

// Function to show last viewed quote from session storage
function showLastViewedQuote() {
  const lastQuote = JSON.parse(sessionStorage.getItem("lastViewedQuote"));
  if (lastQuote) {
      document.getElementById("quoteDisplay").innerHTML = `
          <p>"${lastQuote.text}"</p>
          <small>- ${lastQuote.category}</small>
      `;
  }
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newQuoteText === "" || newQuoteCategory === "") {
      alert("Please enter both a quote and a category.");
      return;
  }

  quotes.push({ text: newQuoteText, category: newQuoteCategory });
  saveQuotes(); // Save quotes to local storage

  // Show newly added quote
  document.getElementById("quoteDisplay").innerHTML = `
      <p>"${newQuoteText}"</p>
      <small>- ${newQuoteCategory}</small>
  `;

  // Clear input fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// Function to export quotes as JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();

  fileReader.onload = function(event) {
      try {
          const importedQuotes = JSON.parse(event.target.result);

          if (!Array.isArray(importedQuotes) || importedQuotes.some(q => !q.text || !q.category)) {
              alert("Invalid JSON format. Ensure each quote has 'text' and 'category' fields.");
              return;
          }

          quotes.push(...importedQuotes);
          saveQuotes(); // Save to local storage
          alert("Quotes imported successfully!");
      } catch (error) {
          alert("Error parsing JSON file.");
      }
  };

  fileReader.readAsText(event.target.files[0]);
}

// Function to dynamically create the quote addition form
function createAddQuoteForm() {
  const formContainer = document.createElement("div");

  const quoteInput = document.createElement("input");
  quoteInput.id = "newQuoteText";
  quoteInput.type = "text";
  quoteInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", addQuote);

  const exportButton = document.createElement("button");
  exportButton.textContent = "Export Quotes";
  exportButton.addEventListener("click", exportToJsonFile);

  const importInput = document.createElement("input");
  importInput.type = "file";
  importInput.id = "importFile";
  importInput.accept = ".json";
  importInput.addEventListener("change", importFromJsonFile);

  formContainer.appendChild(quoteInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);
  formContainer.appendChild(exportButton);
  formContainer.appendChild(importInput);

  document.body.appendChild(formContainer);
}

// Event listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.addEventListener("DOMContentLoaded", () => {
  createAddQuoteForm();
  showLastViewedQuote(); // Show last viewed quote if available
});
