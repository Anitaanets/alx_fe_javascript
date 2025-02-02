// Load quotes from local storage or initialize an empty array
let quotes = JSON.parse(localStorage.getItem("quotes")) || [];

// Function to display a random quote
function showRandomQuote() {
    if (quotes.length === 0) {
        document.getElementById("quoteDisplay").innerHTML = "<p>No quotes available.</p>";
        return;
    }
    let randomIndex = Math.floor(Math.random() * quotes.length);
    let randomQuote = quotes[randomIndex];

    document.getElementById("quoteDisplay").innerHTML = `<p>"${randomQuote.text}" - ${randomQuote.category}</p>`;
}

// Function to add a new quote
function addQuote() {
    let newQuoteText = document.getElementById("newQuoteText").value.trim();
    let newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (newQuoteText === "" || newQuoteCategory === "") {
        alert("Please enter both quote text and category.");
        return;
    }

    let newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    saveQuotes();

    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    populateCategories();
    alert("Quote added successfully!");
}

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to populate category dropdown
function populateCategories() {
    let categorySelect = document.getElementById("categoryFilter");
    let uniqueCategories = ["All Categories", ...new Set(quotes.map(q => q.category))];

    categorySelect.innerHTML = uniqueCategories.map(category => 
        `<option value="${category}">${category}</option>`
    ).join("");
}

// Function to filter quotes by category
function filterQuotes() {
    let selectedCategory = document.getElementById("categoryFilter").value;
    let quoteDisplay = document.getElementById("quoteDisplay");

    let filteredQuotes = selectedCategory === "All Categories" 
        ? quotes 
        : quotes.filter(q => q.category === selectedCategory);

    quoteDisplay.innerHTML = filteredQuotes.length === 0 
        ? "<p>No quotes available in this category.</p>"
        : filteredQuotes.map(q => `<p>"${q.text}" - ${q.category}</p>`).join("");

    localStorage.setItem("selectedCategory", selectedCategory);
}

// Function to restore last selected filter
function restoreFilter() {
    let savedCategory = localStorage.getItem("selectedCategory") || "All Categories";
    document.getElementById("categoryFilter").value = savedCategory;
    filterQuotes();
}

// Function to export quotes as a JSON file
function exportQuotes() {
    let dataStr = JSON.stringify(quotes, null, 2);
    let blob = new Blob([dataStr], { type: "application/json" });
    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    let fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            let importedQuotes = JSON.parse(event.target.result);
            quotes.push(...importedQuotes);
            saveQuotes();
            populateCategories();
            alert("Quotes imported successfully!");
        } catch (error) {
            alert("Invalid JSON file.");
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// Event Listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("categoryFilter").addEventListener("change", filterQuotes);

// Initialize the app
populateCategories();
restoreFilter();
