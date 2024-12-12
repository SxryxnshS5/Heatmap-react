import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Page1 from "./pages/Page1";
import Page2A from "./pages/Page2A";
import Page2B from "./pages/Page2B";
import Page3A from "./pages/Page3A";
import Page3B from "./pages/Page3B";
import Page3C from "./pages/Page3C";
import Page3D from "./pages/Page3D";
import Page3E from "./pages/Page3E";
import Page3F from "./pages/Page3F";
import Page3G from "./pages/Page3G";
import Page3H from "./pages/Page3H";
import Page3I from "./pages/Page3I";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2A" element={<Page2A />} />
        <Route path="/page2B" element={<Page2B />} />
        <Route path="/page3A" element={<Page3A />} />
        <Route path="/page3B" element={<Page3B />} />
        <Route path="/page3C" element={<Page3C />} />
        <Route path="/page3D" element={<Page3D />} />
        <Route path="/page3E" element={<Page3E />} />
        <Route path="/page3F" element={<Page3F />} />
        <Route path="/page3G" element={<Page3G />} />
        <Route path="/page3H" element={<Page3H />} />
        <Route path="/page3I" element={<Page3I />} />
      </Routes>
    </Router>
  );
}

export default App;
