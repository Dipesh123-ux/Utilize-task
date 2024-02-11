import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/orders" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
