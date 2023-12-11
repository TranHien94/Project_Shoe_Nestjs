import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Cart, Explore, Home, Preview } from "./pages/index";
import Footer from "./components/Footer";
import LoginForm from "./pages/Signin";
import SignUpForm from "./pages/Singup";

const App = () => {
  return (
      <div className="bg-gray-50 dark:bg-[#121212] h-full overflow-y-hidden">
          <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/preview/:id" element={<Preview />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignUpForm />} />
            </Routes>
          <Footer />
      </div>
  );
};

export default App;
