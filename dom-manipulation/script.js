document.addEventListener("DOMContentLoaded", () => {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  const categoryFilter = document.getElementById("categoryFilter");
  const importFile = document.getElementById("importFile");
  
  let quotes = JSON.parse(localStorage.getItem("quotes")) || [];
  let lastSelectedCategory = localStorage.getItem("selectedCategory") || "all";

  function showRandomQuote() {
      if (quotes.length === 0) {
          quoteDisplay.textContent = "No quotes available.";
          return;
      }
      const filteredQuotes = lastSelectedCategory === "all" ? quotes : quotes.filter(q => q.category === lastSelectedCategory);
      if (filteredQuotes.length === 0) {
          quoteDisplay.textContent = "No quotes available in this category.";
          return;
      }
      const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
      quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
  }
  
  function addQuote() {
      const newQuoteText = document.getElementById("newQuoteText").value.trim();
      const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();
      if (newQuoteText === "" || newQuoteCategory === "") {
          alert("Both quote and category are required!");
          return;
      }
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      saveQuotes();
      populateCategories();
      document.getElementById("newQuoteText").value = "";
      document.getElementById("newQuoteCategory").value = "";
  }
  
  function saveQuotes() {
      localStorage.setItem("quotes", JSON.stringify(quotes));
  }
  
  function populateCategories() {
      const categories = [...new Set(quotes.map(q => q.category))];
      categoryFilter.innerHTML = `<option value="all">All Categories</option>` + categories.map(c => `<option value="${c}">${c}</option>`).join("");
      categoryFilter.value = lastSelectedCategory;
  }
  
  function filterQuotes() {
      lastSelectedCategory = categoryFilter.value;
      localStorage.setItem("selectedCategory", lastSelectedCategory);
      showRandomQuote();
  }
  
  function exportToJson() {
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
  
  function importFromJsonFile(event) {
      const fileReader = new FileReader();
      fileReader.onload = function(event) {
          const importedQuotes = JSON.parse(event.target.result);
          quotes.push(...importedQuotes);
          saveQuotes();
          populateCategories();
          alert("Quotes imported successfully!");
      };
      fileReader.readAsText(event.target.files[0]);
  }
  
  function createAddQuoteForm() {
      const formContainer = document.createElement("div");
      formContainer.innerHTML = `
          <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
          <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
          <button onclick="addQuote()">Add Quote</button>
          <button onclick="exportToJson()">Export Quotes</button>
          <input type="file" id="importFile" accept=".json" onchange="importFromJsonFile(event)" />
      `;
      document.body.appendChild(formContainer);
  }

  createAddQuoteForm();
  newQuoteBtn.addEventListener("click", showRandomQuote);
  categoryFilter.addEventListener("change", filterQuotes);
  
  populateCategories();
  showRandomQuote();
});
