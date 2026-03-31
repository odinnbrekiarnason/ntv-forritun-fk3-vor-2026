import { Recipe } from "@/features/recipes/component/RecipeCard";


export function IndexPage() {
  return (
    <main className="min-h-screen bg-background">
      <h1 className="text-4xl font-bold">Verkefni 9</h1>
      <h2 className="bg-blend-color text-2xl font-bold self-center">Random Recipes</h2>
      <Recipe></Recipe>
    </main>
  );
}
