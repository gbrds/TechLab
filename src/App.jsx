import GameFrame from "./GameFrame";
import FolderCard from './components/FolderCard';
import './App.css';


function App() {
  const testFolder = {
    id: 1,
    title: "UX/UI disaini nooremspetsialist",
    unlocked: false,
    completed: false,
    progress: "0/5"
  };

  return (
    <div style={{ padding: '2rem', background: 'linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 100%)', minHeight: '100vh' }}>
      <FolderCard folder={testFolder} />
    </div>
  );
}

export default App;