
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { AdminForm } from "./pages/index";
import {AdminSignin} from './pages/index'

const App = () => {
  return (
    <div className="bg-gray-50 dark:bg-[#121212] h-full overflow-y-hidden">
      <Routes>
        <Route path="/" element={<AdminSignin/>} />
        <Route path="/admin" element={<AdminForm />} />
      </Routes>
    </div>
  );
};

export default App;