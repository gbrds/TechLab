import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SoftDevGame from "./games/softDevGame/softDevGame.jsx";
import CatchBreachView from "./games/catchBreach/catchBreach.jsx";
import SignalBoosterGame from "./games/signalBooster/signalBooster.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default redirect to the game */}
        <Route path="/" element={<Navigate to="/softDevGame" replace />} />

        {/* Main route for your minigame */}
        <Route path="/softDevGame" element={<SoftDevGame />} />

        <Route path="/catch-breach" element={<CatchBreachView />} />

        <Route path="/signal-booster" element={<SignalBoosterGame />} /> 

        {/* Fallback route */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;