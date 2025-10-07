import React, { useMemo, useState } from 'react';
import './FolderCard.css';

function FolderCard({ folder }) {
  const [isHovered, setIsHovered] = useState(false);

  const imageSrc = useMemo(() => {
    if (!folder?.icons) return undefined;
    if (isHovered && folder.icons.hover) return folder.icons.hover; // show hover art regardless of lock
    return folder.unlocked
      ? (folder.icons.unlocked || folder.icons.locked)
      : (folder.icons.locked || folder.icons.unlocked);
  }, [folder, isHovered]);

  // Debug: helps verify which SVG is used for each folder on render/hover
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug('[FolderCard] render', { id: folder.id, unlocked: folder.unlocked, hovered: isHovered, src: imageSrc });
  }

  return (
    <div className="folder-card">
      <div
        className={`folder-container ${folder.unlocked ? 'unlocked' : 'locked'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {imageSrc && (
          <img className="folder-svg" src={imageSrc} alt={folder.title} draggable={false} />
        )}
      </div>
      
      <div className="folder-info">
        <h3 className="folder-title">{folder.title}</h3>
        <div className={`folder-status ${folder.completed ? 'completed' : ''}`}>
          <span>{folder.progress} ⭐</span>
          <span className="status-separator">|</span>
          <span className="lock-status">{folder.unlocked ? '🔓' : '🔒'} Lukus</span>
        </div>
      </div>
    </div>
  );
}

export default FolderCard;