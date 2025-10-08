import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SoftDevGame from "./games/softDevGame/softDevGame.jsx";
import CatchBreachView from "./games/catchBreach/catchBreach.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default redirect to the game */}
        <Route path="/" element={<Navigate to="/softDevGame" replace />} />

        {/* Main route for your minigame */}
        <Route path="/softDevGame" element={<SoftDevGame />} />

        <Route path="/catch-breach" element={<CatchBreachView />} />

        {/* Fallback route */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;