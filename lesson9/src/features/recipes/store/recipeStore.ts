
interface RecipeStore {
  Name: string;
  UpdateRecipe: () => void;
  UpdateIMG: (url: string) => void;
  GetIngredients: (id: string) => void;
  GetMeasurements: (id: string) => void;
  
}