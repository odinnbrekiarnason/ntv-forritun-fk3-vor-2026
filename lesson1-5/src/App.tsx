import "./App.css";
import { LoginForm } from "./features/User/LoginForm";
// import { ShopCard } from "./components/ShopCard";

export const isTrue: boolean = true 

function App() {
  return (
    <div className="w-full justify-center">
      
      {/* <ShopCard />
      <ShopCard /> */}
      
        <LoginForm />
      
    </div>
  );
}

export default App;
