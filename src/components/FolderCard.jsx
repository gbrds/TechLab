import './FolderCard.css';

function FolderCard({ folder }) {
  const styleVars = {
    '--folder-tab-start': folder?.colors?.tabStart,
    '--folder-tab-end': folder?.colors?.tabEnd,
    '--folder-body-start': folder?.colors?.bodyStart,
    '--folder-body-end': folder?.colors?.bodyEnd,
  };

  return (
    <div className="folder-card">
      <div className={`folder-container ${folder.unlocked ? 'unlocked' : 'locked'}`} style={styleVars}>
        <div className="folder-shape">
          <div className="folder-tab" />
          <div className="folder-body" />
        </div>
        {!folder.unlocked && (
          <div className="lock-badge" aria-label="Locked" title="Locked">🔒</div>
        )}
        {folder.unlocked && folder.id === 1 && (
          <div className="folder-content">
            <div className="design-tools">
              <div className="tool-icon tool-figma">F</div>
              <div className="tool-icon tool-sketch">S</div>
              <div className="tool-icon tool-adobe">A</div>
              <div className="tool-icon tool-invision">I</div>
            </div>
          </div>
        )}
      </div>
      
      <div className="folder-info">
        <h3 className="folder-title">{folder.title}</h3>
        <div className={`folder-status ${folder.completed ? 'completed' : ''}`}>
          <span>{folder.progress} ⭐</span>
          <span className="status-separator">|</span>
          <span className="lock-status">🔒 Lukus</span>
        </div>
      </div>
    </div>
  );
}

export default FolderCard;