let productCount = 0;
let editMode = true; // starts in edit mode

const productsContainer = document.getElementById("products-container");
const addProductBtn = document.getElementById("add-product-btn");
const toggleEditBtn = document.getElementById("toggle-edit-btn");
const calculateBtn = document.getElementById("calculate-btn");
const resultDiv = document.getElementById("result");

// Function to create a product line
function addProductLine() {
  productCount++;
  const line = document.createElement("div");
  line.className = "product-line";
  line.dataset.index = productCount;

  line.innerHTML = `
    <input type="text" placeholder="Product ${productCount}" class="product-name">
    <input type="number" placeholder="CHO/100g" class="product-cho" min="0" step="any">
    <input type="number" placeholder="Grams used" class="product-grams" min="0" step="any">
  `;

  productsContainer.appendChild(line);
}

// Toggle between edit and save modes
function toggleEditMode() {
  editMode = !editMode;

  const inputs = productsContainer.querySelectorAll("input");
  inputs.forEach(input => {
    input.disabled = !editMode;
  });

  addProductBtn.style.display = editMode ? "inline-block" : "none";
  toggleEditBtn.textContent = editMode ? "Save" : "Edit";
}

// Calculate final result
function calculateCHO() {
  let totalCHO = 0;

  const productLines = document.querySelectorAll(".product-line");
  productLines.forEach(line => {
    const choPer100g = parseFloat(line.querySelector(".product-cho").value) || 0;
    const gramsUsed = parseFloat(line.querySelector(".product-grams").value) || 0;
    const choValue = (choPer100g / 100) * gramsUsed;
    totalCHO += choValue;
  });

  const totalWeight = parseFloat(document.getElementById("total-weight").value) || 0;
  const dishWeight = parseFloat(document.getElementById("dish-weight").value) || 0;

  const netWeight = totalWeight - dishWeight;
  if (netWeight <= 0) {
    resultDiv.textContent = "Error: Net weight must be greater than 0.";
    return;
  }

  const choPerGram = totalCHO / netWeight;
  const choPer100g = (choPerGram * 100).toFixed(2);

  resultDiv.textContent = `CHO/100g: ${choPer100g}`;
}

// Event listeners
addProductBtn.addEventListener("click", addProductLine);
toggleEditBtn.addEventListener("click", toggleEditMode);
calculateBtn.addEventListener("click", calculateCHO);

// Start with one product line
addProductLine();