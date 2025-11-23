window.addEventListener("DOMContentLoaded", () => {
  loadCategories();
});

async function loadCategories() {
  const categoriesContainer = document.getElementById("categoriesContainer");
  const loading = document.getElementById("loading");
  categoriesContainer.innerHTML = "";

  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const data = await response.json();

    if (data.categories && data.categories.length > 0) {
      loading.style.display = "none";

      data.categories.forEach((category) => {
        const categoryCard = `
          <div class="col-lg-3 col-md-4 col-6">
            <a href="category-meals.html?category=${
              category.strCategory
            }" style="text-decoration: none;">
              <div class="food-card">
                <img src="${category.strCategoryThumb}" alt="${
          category.strCategory
        }" class="img-fluid">
                <div class="overlay">
                  <h5>${category.strCategory}</h5>
                  <p>${category.strCategoryDescription.substring(0, 50)}...</p>
                </div>
              </div>
            </a>
          </div>
        `;
        categoriesContainer.innerHTML += categoryCard;
      });
    } else {
      loading.style.display = "none";
      categoriesContainer.innerHTML =
        '<div class="col-12 text-center p-5"><p class="text-warning">No categories found.</p></div>';
    }
  } catch (error) {
    console.error("Error loading categories:", error);
    loading.style.display = "none";
    categoriesContainer.innerHTML =
      '<div class="col-12 text-center p-5"><p class="text-danger">Error loading categories. Please refresh the page.</p></div>';
  }
}
loadCategories();
