async function loadMeals() {
  const mealsContainer = document.getElementById("mealsContainer");
  mealsContainer.innerHTML = "";

  try {
    const meals = [];
    for (let i = 0; i < 12; i++) {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = await response.json();
      console.log(data);
      if (data.meals) {
        meals.push(data.meals[0]);
      }
    }

    meals.forEach((meal) => {
      const mealCard = `
        <div class="col-lg-3 col-md-4 col-6">
          <a href="details.html?id=${
            meal.idMeal
          }" style="text-decoration: none;">
            <div class="food-card">
              <img src="${meal.strMealThumb}" alt="${
        meal.strMeal
      }" class="img-fluid">
              <div class="overlay">
                <h5>${meal.strMeal}</h5>
                <p>${meal.strCategory || "Delicious dish"}</p>
              </div>
            </div>
          </a>
        </div>
      `;
      mealsContainer.innerHTML += mealCard;
    });
  } catch (error) {
    console.error("Error loading meals:", error);
    mealsContainer.innerHTML =
      '<div class="col-12 text-center p-5"><p class="text-danger">Error loading meals. Please refresh the page.</p></div>';
  }
}
loadMeals();
