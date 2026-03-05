import "./App.css";
import { Form } from "./components/Form";
import { ShopCard } from "./components/ShopCard";


function App() {
  return (
    <div className="w-full justify-center">
      <ShopCard />
      <ShopCard />
      <div>
        <Form />
      </div>
    </div>
  );
}

export default App;
