// Dark/Light Mode Toggle
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.innerHTML = document.body.classList.contains("dark-mode")
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
});

// Language Toggle (English / Nepali)
const langToggle = document.getElementById("lang-toggle");
langToggle.addEventListener("click", () => {
  const heroTitle = document.getElementById("hero-title");
  const heroDesc = document.getElementById("hero-desc");

  if(langToggle.textContent.includes("ने")) {
    // Switch to English
    heroTitle.textContent = "Welcome to Nibedan";
    heroDesc.textContent = "Your one-stop platform for sample letters and recommendation letters.";
    langToggle.textContent = "ने / En";
  } else {
    // Switch to Nepali
    heroTitle.textContent = "निवेदनमा स्वागत छ";
    heroDesc.textContent = "नमूना पत्र र सिफारिस पत्रको लागि तपाईंको एक स्टप प्लेटफर्म।";
    langToggle.textContent = "En / ने";
  }
});

// Letters Section: Fetch & Render
const lettersContainer = document.getElementById("letters-cards");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");

let lettersData = [];
let currentLang = "en"; // Default English

// Fetch letters.json
fetch("letters.json")
  .then(res => res.json())
  .then(data => {
    lettersData = data;
    renderLetters();
  })
  .catch(err => console.error("Error fetching letters:", err));

// Render letters based on search/filter
function renderLetters() {
  lettersContainer.innerHTML = "";

  const searchText = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  lettersData.forEach(letter => {
    const title = currentLang === "en" ? letter.title_en : letter.title_np;
    const content = currentLang === "en" ? letter.content_en : letter.content_np;

    if(
      (title.toLowerCase().includes(searchText) || content.toLowerCase().includes(searchText)) &&
      (category === "All" || letter.category === category)
    ) {
      const card = document.createElement("div");
      card.classList.add("letter-card");
      card.innerHTML = `<h3>${title}</h3><p>${content}</p><p><strong>Category:</strong> ${letter.category}</p>`;
      lettersContainer.appendChild(card);
    }
  });
}

// Event Listeners
searchInput.addEventListener("input", renderLetters);
categoryFilter.addEventListener("change", renderLetters);

// Update letters when language toggled
langToggle.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "np" : "en";
  renderLetters();
});
