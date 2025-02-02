let quotes = JSON.parse(localStorage.getItem('quotes')) || [];
const quoteDisplay = document.getElementById('quoteDisplay');
const categoryFilter = document.getElementById('categoryFilter');

document.getElementById('newQuote').addEventListener('click', showRandomQuote);

document.addEventListener('DOMContentLoaded', () => {
  populateCategories();
  showRandomQuote();
  fetchQuotesFromServer();
});

function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.textContent = 'No quotes available';
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteDisplay.textContent = `${quotes[randomIndex].text} - ${quotes[randomIndex].category}`;
  sessionStorage.setItem('lastViewedQuote', JSON.stringify(quotes[randomIndex]));
}

function addQuote() {
  const text = document.getElementById('newQuoteText').value;
  const category = document.getElementById('newQuoteCategory').value;
  if (text && category) {
    quotes.push({ text, category });
    saveQuotes();
    populateCategories();
    showRandomQuote();
  }
}

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function populateCategories() {
  const categories = ['all', ...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = categories.map(c => `<option value="${c}">${c}</option>`).join('');
}

function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(q => q.category === selectedCategory);
  quoteDisplay.textContent = filteredQuotes.length > 0 ? filteredQuotes.map(q => `${q.text} - ${q.category}`).join('\n') : 'No quotes in this category';
  localStorage.setItem('lastSelectedCategory', selectedCategory);
}

document.getElementById('importFile').addEventListener('change', importFromJsonFile);

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

function exportQuotes() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'quotes.json';
  link.click();
}

document.getElementById('exportQuotes').addEventListener('click', exportQuotes);

async function fetchQuotesFromServer() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // Example API
    const data = await response.json();
    const serverQuotes = data.slice(0, 5).map(item => ({ text: item.title, category: 'Server' }));
    quotes.push(...serverQuotes);
    saveQuotes();
    populateCategories();
    showRandomQuote();
  } catch (error) {
    console.error('Error fetching quotes from server:', error);
  }
}
