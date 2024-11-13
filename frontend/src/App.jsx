import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import Home from "./pages/home";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
      </Routes>
    </>
  );
}
export default App;
