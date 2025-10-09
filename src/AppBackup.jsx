//Vana App.jsx juhul kui minu poolt tehtud lahendus ei sobi. Mängu lehekülgedele pääseb ligi läbi placeholder nupude mitte kaustade.


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GameFrame from "./GameFrame";
import FolderGrid from "./components/FolderGrid";
import AlertBanner from "./components/AlertBanner";
import ProgressPanel from "./components/ProgressPanel";
import PopupMenu from "./components/UX";
import Developer from "./components/Tarkvara";
import Kestlikud from "./components/Kestlikud";
import ITSpetsialist from './components/ITSpets';
import IKT from './components/IKT';
import './App.css';

import FolderLocked from './svg/Folder_Locked.svg';
import FolderUnlocked from './svg/Folder_Unlocked.svg';
import FolderCompleted from './svg/Folder_Completed.svg';
import FolderFailed from './svg/Folder_Failed.svg';

import UXUnlocked from './svg/UX_Unlocked.svg';
import UXHover from './svg/UX_Hover.svg';
import UXLocked from './svg/UX_Locked.svg';
import DevLocked from './svg/Dev_Locked.svg';
import DevHover from './svg/Dev_Hover.svg';
import DevUnlocked from './svg/Dev_Unlocked.svg';
import SusLocked from './svg/Sus_Locked.svg';
import SusHover from './svg/Sus_Hover.svg';
import SusUnlocked from './svg/Sus_Unlocked.svg';
import ITLocked from './svg/IT_Locked.svg';
import ITHover from './svg/IT_Hover.svg';
import ITUnlocked from './svg/IT_Unlocked.svg';
import ICTLocked from './svg/ICT_Locked.svg';
import ICTHover from './svg/ICT_Hover.svg';
import ICTUnlocked from './svg/ICT_Unlocked.svg';

function Home() {
  const passThreshold = 4;

  const baseFolders = [
    { id: 1, unlocked: true, progress: 0, icons: { unlocked: UXUnlocked, hover: UXHover, locked: UXLocked } },
    { id: 2, unlocked: false, progress: 0, icons: { unlocked: DevUnlocked, hover: DevHover, locked: DevLocked } },
    { id: 3, unlocked: false, progress: 0, icons: { unlocked: SusUnlocked, hover: SusHover, locked: SusLocked } },
    { id: 4, unlocked: false, progress: 0, icons: { unlocked: ITUnlocked, hover: ITHover, locked: ITLocked } },
    { id: 5, unlocked: false, progress: 0, icons: { unlocked: ICTUnlocked, hover: ICTHover, locked: ICTLocked } } // locked fixed
  ];

  const folders = baseFolders.map((f, idx) => {
    let status = f.unlocked ? 'unlocked' : 'locked';
    if (f.progress >= passThreshold) status = 'completed';
    if (status === 'completed' && baseFolders[idx + 1]) {
      baseFolders[idx + 1].unlocked = true;
    }
    return {
      ...f,
      status,
      statusIcons: {
        locked: FolderLocked,
        unlocked: FolderUnlocked,
        completed: FolderCompleted,
        failed: FolderFailed
      }
    };
  });

  return (
    <div style={{ padding: '2rem', background: '#160C21', minHeight: '100vh' }}>
      <div className="app-title">🚨 VOCO TechLab</div>

      {/* Game Navigation Buttons */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <Link to="/ux-ui">
          <button
            style={{
              background: '#ff8a00',
              border: 'none',
              color: '#1d142a',
              padding: '0.6rem 1rem',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Ava UX Mäng
          </button>
        </Link>

        <Link to="/tarkvara">
          <button
            style={{
              background: '#007BFF',
              border: 'none',
              color: '#ffffff',
              padding: '0.6rem 1rem',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Ava Tarkvaraarendaja Mäng
          </button>
        </Link>

        <Link to="/kestlikud">
          <button
            style={{
              background: '#00C853',
              border: 'none',
              color: '#ffffff',
              padding: '0.6rem 1rem',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Ava Kestlikud Tehnoloogiad Mäng
          </button>
        </Link>
      </div>
<Link to="/ITSpetsialist">
  <button
    style={{
      background: '#6200EA',
      border: 'none',
      color: '#ffffff',
      padding: '0.6rem 1rem',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer'
    }}
  >
    Ava IT-Süsteemide Mäng
  </button>
</Link>
<Link to="/IKT">
  <button
    style={{
      background: '#6200EA',
      border: 'none',
      color: '#ffffff',
      padding: '0.6rem 1rem',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer'
    }}
  >
    Ava Info- ja Kommunikatsioonitehnoloogia Mäng
  </button>
</Link>


      <AlertBanner allCompleted={folders.every(f => f.status === 'completed')} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) auto',
          gap: '3rem',
          alignItems: 'start',
          padding: '0 2rem'
        }}
      >
        <FolderGrid folders={folders} />
        <ProgressPanel />
      </div>
    </div>
  );
}

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
