
export type Recipe = {
  id: string;
  Meal: string;
  category: string;
  Origin: string;
  instructions: string;
  imgURL: string;
  ingredients: [string];
  measurements: [string];
}