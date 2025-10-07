import GameFrame from "./GameFrame";
import FolderGrid from "./components/FolderGrid";
import './App.css';


function App() {
  const folders = [
    {
      id: 1,
      title: "UX/UI disaini nooremspetsialist",
      unlocked: false,
      completed: false,
      progress: "0/5",
      colors: {
        tabStart: 'rgba(140,128,190,0.98)',
        tabEnd: 'rgba(108,96,165,0.98)',
        bodyStart: 'rgba(98,86,150,0.96)',
        bodyEnd: 'rgba(66,57,105,0.96)'
      }
    },
    {
      id: 2,
      title: "Noorem tarkvaraarendaja",
      unlocked: false,
      completed: false,
      progress: "0/5",
      colors: {
        tabStart: 'rgba(115, 169, 173, 0.98)',
        tabEnd: 'rgba(89, 143, 147, 0.98)',
        bodyStart: 'rgba(65, 118, 122, 0.96)',
        bodyEnd: 'rgba(42, 94, 98, 0.96)'
      }
    },
    {
      id: 3,
      title: "Kestlikud tehnoloogiad",
      unlocked: false,
      completed: false,
      progress: "0/5",
      colors: {
        tabStart: 'rgba(77, 173, 143, 0.98)',
        tabEnd: 'rgba(48, 140, 112, 0.98)',
        bodyStart: 'rgba(28, 115, 90, 0.96)',
        bodyEnd: 'rgba(15, 92, 70, 0.96)'
      }
    },
    {
      id: 4,
      title: "IT süsteemide nooremspetsialist",
      unlocked: false,
      completed: false,
      progress: "0/5",
      colors: {
        tabStart: 'rgba(180, 180, 180, 0.98)',
        tabEnd: 'rgba(140, 140, 140, 0.98)',
        bodyStart: 'rgba(115, 115, 115, 0.96)',
        bodyEnd: 'rgba(85, 85, 85, 0.96)'
      }
    },
    {
      id: 5,
      title: "Info- ja kommunikatsioonitehnoloogia",
      unlocked: false,
      completed: false,
      progress: "0/5",
      colors: {
        tabStart: 'rgba(189, 153, 78, 0.98)',
        tabEnd: 'rgba(156, 121, 49, 0.98)',
        bodyStart: 'rgba(132, 98, 34, 0.96)',
        bodyEnd: 'rgba(105, 78, 26, 0.96)'
      }
    }
  ];

  return (
    <div style={{ padding: '2rem', background: 'linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 100%)', minHeight: '100vh' }}>
      <FolderGrid folders={folders} />
    </div>
  );
}

export default App;