import { Ingredient } from "./IIngredients";
export interface Recipe {
    recipe_name: string;
    recipe_photo: string;
    recipe_url: string;
    Calories: number;
    Carbohydrates: number;
    NetCarbs: number;
    Fat: number;
    Protein: number;
    Sodium: number;
    Prep_Time: string;
    Difficulty_Level: string;
    Spice_Level: string;
    Ingredients:[Ingredient];
    id: number;
  }