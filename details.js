const urlParams = new URLSearchParams(window.location.search);
const mealId = urlParams.get("id");

// Load meal details on page load
window.addEventListener("DOMContentLoaded", () => {
  if (mealId) {
    loadMealDetails(mealId);
  } else {
    window.location.href = "index.html";
  }
});

// Function to load meal details
async function loadMealDetails(id) {
  const loading = document.getElementById("loading");
  const mealDetails = document.getElementById("mealDetails");

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await response.json();

    if (data.meals && data.meals.length > 0) {
      const meal = data.meals[0];
      displayMealDetails(meal);
      mealDetails.style.display = "block";
    } else {
      alert("Meal not found!");
      window.location.href = "index.html";
    }
  } catch (error) {
    console.error("Error loading meal details:", error);
    alert("Error loading meal details. Please try again.");
  } finally {
    loading.style.display = "none";
  }
}

// Function to display meal details
function displayMealDetails(meal) {
  // Set basic info
  document.getElementById("mealImage").src = meal.strMealThumb;
  document.getElementById("mealName").textContent = meal.strMeal;
  document.getElementById("mealInstructions").textContent =
    meal.strInstructions;
  document.getElementById("mealArea").textContent = meal.strArea;
  document.getElementById("mealCategory").textContent = meal.strCategory;

  // Display ingredients
  const ingredientsList = document.getElementById("ingredientsList");
  ingredientsList.innerHTML = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      const badge = document.createElement("span");
      badge.className = "badge bg-info text-dark";
      badge.style.fontSize = "0.9rem";
      badge.style.padding = "8px 12px";
      badge.textContent = `${
        measure ? measure.trim() : ""
      } ${ingredient}`.trim();
      ingredientsList.appendChild(badge);
    }
  }

  // Display tags
  const tagsList = document.getElementById("tagsList");
  tagsList.innerHTML = "";
  if (meal.strTags) {
    const tags = meal.strTags.split(",");
    tags.forEach((tag) => {
      const badge = document.createElement("span");
      badge.className = "badge bg-success";
      badge.style.fontSize = "0.9rem";
      badge.style.padding = "8px 12px";
      badge.textContent = tag.trim();
      tagsList.appendChild(badge);
    });
  } else {
    tagsList.innerHTML = '<span class="text-muted">No tags available</span>';
  }

  // Display source links
  const sourceLinks = document.getElementById("sourceLinks");
  sourceLinks.innerHTML = "";

  if (meal.strSource) {
    const sourceBtn = document.createElement("a");
    sourceBtn.href = meal.strSource;
    sourceBtn.target = "_blank";
    sourceBtn.className = "btn btn-success me-2";
    sourceBtn.innerHTML = "Source";
    sourceLinks.appendChild(sourceBtn);
  }

  if (meal.strYoutube) {
    const youtubeBtn = document.createElement("a");
    youtubeBtn.href = meal.strYoutube;
    youtubeBtn.target = "_blank";
    youtubeBtn.className = "btn btn-danger";
    youtubeBtn.innerHTML = "Youtube";
    sourceLinks.appendChild(youtubeBtn);
  }
}
