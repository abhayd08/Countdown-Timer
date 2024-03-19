import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
    </Routes>
  );
};

export default App;
