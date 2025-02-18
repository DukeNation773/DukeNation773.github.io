document.addEventListener("DOMContentLoaded", function () {
  const dishData = {
    dish1: {
      name: "BBQ Pizza",
      info: "Perfect blend of bbq sauce and cheese",
      price: 15.99,
    },
    dish2: {
      name: "Garlic Knots ",
      info: "4 count. The perfect appetizer",
      price: 1.74,
    },
    dish3: {
      name: "Fresco Sub",
      info: "Prosciutto, buffalo mozzarella cheese, arugula, olive oil, vinegar & sliced tomatoes.",
      price: 15.99,
    },
    dish4: {
      name: "10-piece Bone-in Wings",
      info: "Tossed in your choice of suace and heat index. Served with choice of carrots or celery with ranch or blue cheese to dip.",
      price: 13.49,
    },
    dish5: {
      name: "Fiesta Corn R'bz",
      info: "Eat it like a rib. Tender crisp corn cobettes served with Tajin based aioli drizzle and topped with parmesan cheese.",
      price: 9.94,
    },
    dish6: {
      name: "Chicken Caesar Salad",
      info: "Freshly chopped romaine lettuce and grilled chicken breast drizzled with Smoky Caesar dressing and garnished with parmesan cheese and pretzel croutons.",
      price: 10.99,
    },
    dish7: {
      name: "Chicken Pakora",
      info: "Chicken cubes deep fried tossed with yogurt green chilies and curry leaves.",
      price: 9.97,
    },
    dish8: {
      name: "Don Tadka",
      info: "Lentil stew simmered in simple spices and tempered.",
      price: 11.39,
    },
    dish9: {
      name: "Naan",
      info: "Leavened bread baked in a clay oven.",
      price: 2.6,
    },
  };

  document.querySelectorAll(".restaurant").forEach((restaurant) => {
    const dishes = restaurant.querySelectorAll(".dish");
    const dishDescription = restaurant.querySelector(".dish-description");
    const dishName = dishDescription.querySelector("#dish-name");
    const dishInfo = dishDescription.querySelector("#dish-info");
    const dishPrice = dishDescription.querySelector("#dish-price");

    dishes.forEach((dish) => {
      dish.addEventListener("click", function () {
        if (this.classList.contains("selected")) {
          this.classList.remove("selected");
          dishDescription.classList.add("hidden");
        } else {
          dishes.forEach((img) => img.classList.remove("selected"));

          this.classList.add("selected");

          const dishId = this.id;
          dishName.textContent = dishData[dishId].name;
          dishInfo.textContent = dishData[dishId].info;
          dishPrice.textContent = "$" + dishData[dishId].price.toFixed(2);
          dishDescription.classList.remove("hidden");
        }
      });
    });
  });

  const availableDishes = document.getElementById("available-dishes");
  const selectedDishes = document.getElementById("selected-dishes");
  const totalCostElement = document.getElementById("total-cost");
  let totalCost = 0;

  Object.keys(dishData).forEach((dishId) => {
    const dish = dishData[dishId];
    const listItem = document.createElement("li");
    listItem.textContent = `${dish.name} - $${dish.price.toFixed(2)}`;
    listItem.dataset.dishId = dishId;
    listItem.addEventListener("click", function () {
      addDishToMealPlan(dishId);
    });
    availableDishes.appendChild(listItem);
  });

  function addDishToMealPlan(dishId) {
    const dish = dishData[dishId];
    let existingItem = selectedDishes.querySelector(
      `[data-dish-id='${dishId}']`
    );

    if (existingItem) {
      let quantityElement = existingItem.querySelector(".quantity");
      let quantity = parseInt(quantityElement.textContent) + 1;
      quantityElement.textContent = quantity;
    } else {
      const listItem = document.createElement("li");
      listItem.dataset.dishId = dishId;
      listItem.innerHTML = `${dish.name} - $${dish.price.toFixed(
        2
      )} x <span class='quantity'>1</span>`;
      listItem.addEventListener("click", function () {
        removeDishFromMealPlan(dishId);
      });
      selectedDishes.appendChild(listItem);
    }
    totalCost += dish.price;
    updateTotalCost();
  }

  function removeDishFromMealPlan(dishId) {
    const dish = dishData[dishId];
    let existingItem = selectedDishes.querySelector(
      `[data-dish-id='${dishId}']`
    );

    if (existingItem) {
      let quantityElement = existingItem.querySelector(".quantity");
      let quantity = parseInt(quantityElement.textContent);
      if (quantity > 1) {
        quantityElement.textContent = quantity - 1;
      } else {
        existingItem.remove();
      }
      totalCost -= dish.price;
      updateTotalCost();
    }
  }

  function updateTotalCost() {
    totalCostElement.textContent = "$" + totalCost.toFixed(2);
  }
});
