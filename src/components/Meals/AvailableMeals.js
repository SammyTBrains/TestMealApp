import { useState, useEffect } from "react";

import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/use-http";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const transformedData = (data) => {
    const loadedMeals = [];

    for (const mealKey in data) {
      loadedMeals.push({
        id: mealKey,
        name: data[mealKey].name,
        description: data[mealKey].description,
        price: data[mealKey].price,
      });
    }

    setMeals(loadedMeals);
  };

  const [isLoading, error, fetchMeals] = useHttp();

  useEffect(() => {
    fetchMeals(
      {
        url: "https://httptest-6e34c-default-rtdb.europe-west1.firebasedatabase.app/meals.json",
      },
      transformedData
    );
  }, [fetchMeals]);

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  //Arranged by importance, more important one is below and overrides the one above if true
  let content = <p>No meals found.</p>;

  if (meals.length > 0) {
    content = <ul>{mealsList}</ul>;
  }

  if (error) {
    content = <p className={classes["error-text"]}>{error}</p>;
  }

  //Loading is most important and overrides rest if true
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
