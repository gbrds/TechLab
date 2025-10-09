
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import GameFrame from "./GameFrame";
import FolderGrid from "./components/FolderGrid";
import AlertBanner from "./components/AlertBanner";
import ProgressPanel from "./components/ProgressPanel";
import CompletionModal from "./components/CompletionModal";
import PopupMenu from "./components/UX";
import Developer from "./components/Tarkvara";
import Kestlikud from "./components/Kestlikud";
import ITSpetsialist from "./components/ITSpets";
import IKT from "./components/IKT";
import "./App.css";

import FolderLocked from "./svg/Folder_Locked.svg";
import FolderUnlocked from "./svg/Folder_Unlocked.svg";
import FolderCompleted from "./svg/Folder_Completed.svg";
import FolderFailed from "./svg/Folder_Failed.svg";

import UXUnlocked from "./svg/UX_Unlocked.svg";
import UXHover from "./svg/UX_Hover.svg";
import UXLocked from "./svg/UX_Locked.svg";
import DevLocked from "./svg/Dev_Locked.svg";
import DevHover from "./svg/Dev_Hover.svg";
import DevUnlocked from "./svg/Dev_Unlocked.svg";
import SusLocked from "./svg/Sus_Locked.svg";
import SusHover from "./svg/Sus_Hover.svg";
import SusUnlocked from "./svg/Sus_Unlocked.svg";
import ITLocked from "./svg/IT_Locked.svg";
import ITHover from "./svg/IT_Hover.svg";
import ITUnlocked from "./svg/IT_Unlocked.svg";
import ICTLocked from "./svg/ICT_Locked.svg";
import ICTHover from "./svg/ICT_Hover.svg";
import ICTUnlocked from "./svg/ICT_Unlocked.svg";


function Home() {
  const navigate = useNavigate();
  const passThreshold = 4;
  
  // Game completion state - tracks which games have been completed
  const [completedGames, setCompletedGames] = useState({
    UX: false,
    Dev: false,
    Sus: false,
    IT: false,
    ICT: false
  });

  // Calculate progress based on completed games
  const completedCount = Object.values(completedGames).filter(Boolean).length;
  
  // Base folder configuration with dynamic unlocking
  const baseFolders = [
    { 
      id: 1, 
      name: 'UX', 
      unlocked: true,  
      progress: completedGames.UX ? passThreshold : 0, 
      icons: { unlocked: UXUnlocked, hover: UXHover, locked: UXLocked } 
    },
    { 
      id: 2, 
      name: 'Dev', 
      unlocked: completedGames.UX, 
      progress: completedGames.Dev ? passThreshold : 0, 
      icons: { unlocked: DevUnlocked, hover: DevHover, locked: DevLocked } 
    },
    { 
      id: 3, 
      name: 'Sus', 
      unlocked: completedGames.UX && completedGames.Dev, 
      progress: completedGames.Sus ? passThreshold : 0, 
      icons: { unlocked: SusUnlocked, hover: SusHover, locked: SusLocked } 
    },
    { 
      id: 4, 
      name: 'IT', 
      unlocked: completedGames.UX && completedGames.Dev && completedGames.Sus, 
      progress: completedGames.IT ? passThreshold : 0, 
      icons: { unlocked: ITUnlocked, hover: ITHover, locked: ITLocked } 
    },
    { 
      id: 5, 
      name: 'ICT', 
      unlocked: completedGames.UX && completedGames.Dev && completedGames.Sus && completedGames.IT, 
      progress: completedGames.ICT ? passThreshold : 0, 
      icons: { unlocked: ICTUnlocked, hover: ICTHover, locked: ICTLocked } 
    }
  ];

  // Compute statuses and provide shared status icons
  const folders = baseFolders.map((f) => {
    let status = f.unlocked ? 'unlocked' : 'locked';
    if (f.progress >= passThreshold) status = 'completed';

    // Update folder icon based on completion status
    const updatedIcons = { ...f.icons };
    if (f.progress >= passThreshold) {
      // When completed, show unlocked icon
      updatedIcons.unlocked = f.icons.unlocked;
    } else {
      // When not completed, show locked icon even if unlocked
      updatedIcons.unlocked = f.icons.locked;
    }
    return {
      ...f,
      icons: updatedIcons,
      status,
      statusIcons: {
        locked: FolderLocked,
        unlocked: FolderUnlocked,
        completed: FolderCompleted,
        failed: FolderFailed,
      },
    };
  });

  // State for showing game frame
  const [showGameFrame, setShowGameFrame] = useState(false);
  const [currentGameId, setCurrentGameId] = useState(null);
  
  // State for completion modal
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Function to handle game completion
  const handleGameComplete = (folderId, score) => {
    if (score >= passThreshold) {
      const gameNames = { 1: 'UX', 2: 'Dev', 3: 'Sus', 4: 'IT', 5: 'ICT' };
      const gameName = gameNames[folderId];
      if (gameName) {
        setCompletedGames(prev => {
          const newState = {
            ...prev,
            [gameName]: true
          };
          
          // Check if all games are completed
          const allCompleted = Object.values(newState).every(Boolean);
          if (allCompleted) {
            // Show completion modal after a short delay
            setTimeout(() => {
              setShowCompletionModal(true);
            }, 500);
          }
          
          return newState;
        });
      }
    }
    setShowGameFrame(false);
    setCurrentGameId(null);
  };

  // Function to start a game
  const startGame = (folderId) => {
    setCurrentGameId(folderId);
    setShowGameFrame(true);
  };

  // Function to close game frame
  const closeGameFrame = () => {
    setShowGameFrame(false);
    setCurrentGameId(null);
  };

  // Function to close completion modal
  const closeCompletionModal = () => {
    setShowCompletionModal(false);
  };


  return (
    <div style={{ padding: "2rem", background: "#160C21", minHeight: "100vh" }}>
      <div className="app-title">🚨 VOCO TechLab</div>

      <AlertBanner allCompleted={folders.every((f) => f.status === "completed")} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) auto",
          gap: "3rem",
          alignItems: "start",
          padding: "0 2rem",
        }}
      >
        {/* Navigatsiooni võimaldamine */}
        <FolderGrid folders={folders} onFolderClick={startGame} onFolderClick={handleFolderClick} />
        <ProgressPanel completedCount={completedCount} />
      </div>

      {/* Game Frame */}
      {showGameFrame && (
        <GameFrame 
          folderId={currentGameId} 
          onGameComplete={handleGameComplete}
          onClose={closeGameFrame}
        />
      )}

      {/* Completion Modal */}
      <CompletionModal 
        isOpen={showCompletionModal}
        onClose={closeCompletionModal}
      />
    </div>
  );
}

// -------------- Routid -------------- //
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ux-ui" element={<PopupMenu />} />
        <Route path="/tarkvara" element={<Developer />} />
        <Route path="/kestlikud" element={<Kestlikud />} />
        <Route path="/ITSpetsialist" element={<ITSpetsialist />} />
        <Route path="/IKT" element={<IKT />} />
      </Routes>
    </Router>
  );
}

export default App;
