import "./App.css";
import { Form } from "./components/Form";
import { ShopCard } from "./components/ShopCard";

export const isTrue: boolean = true 

function App() {
  return (
    <div className="w-full justify-center">
       <ShopCard/>
        <Form/>
      
    </div>
  );
}

export default App;
