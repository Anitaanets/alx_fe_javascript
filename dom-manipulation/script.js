// Array of sample quotes with categories
const quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Perseverance" },
  { text: "Believe you can and you're halfway there.", category: "Belief" }
];

// Function to show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  document.getElementById("quoteDisplay").innerHTML = `
      <p>"${randomQuote.text}"</p>
      <small>- ${randomQuote.category}</small>
  `;
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newQuoteText === "" || newQuoteCategory === "") {
      alert("Please enter both a quote and a category.");
      return;
  }

  // Add new quote to the array
  quotes.push({ text: newQuoteText, category: newQuoteCategory });

  // Show the newly added quote
  document.getElementById("quoteDisplay").innerHTML = `
      <p>"${newQuoteText}"</p>
      <small>- ${newQuoteCategory}</small>
  `;

  // Clear input fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// Function to dynamically create the quote addition form
function createAddQuoteForm() {
  const formContainer = document.createElement("div");

  // Create input fields
  const quoteInput = document.createElement("input");
  quoteInput.id = "newQuoteText";
  quoteInput.type = "text";
  quoteInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  // Create add button
  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", addQuote);

  // Append inputs and button to form container
  formContainer.appendChild(quoteInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);

  // Append the form container to the body
  document.body.appendChild(formContainer);
}

// Event listener for the "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Call the function to create the form dynamically
createAddQuoteForm();
