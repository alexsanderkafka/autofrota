import {Routes, Route} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";

import Header from "./components/Header";
import Footer from "./components/Footer";

export default function AppRouter(){
    return(
        <Routes>
            <Route path="/" element={<><Header /><LandingPage /><Footer /></>} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}