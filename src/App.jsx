import UpdateItem from "./components/UpdateItem";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors/1`;

function App() {
  return (
    <div>
      <h1>Update Door Item</h1>
      <UpdateItem />
    </div>
  );
}

export default App;