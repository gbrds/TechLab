import React, { useMemo, useState } from 'react';
import './FolderCard.css';

function FolderCard({ folder }) {
  const [isHovered, setIsHovered] = useState(false);

  // 1) Track folder artwork (UX/Dev/IT/etc.)
  const folderImageSrc = useMemo(() => {
    if (!folder?.icons) return undefined;
    if (isHovered && folder.icons.hover) return folder.icons.hover;
    return folder.unlocked ? (folder.icons.unlocked || folder.icons.locked)
                           : (folder.icons.locked || folder.icons.unlocked);
  }, [folder, isHovered]);

  // 2) Status artwork (locked/unlocked/completed/failed) shown under the folder
  const statusImageSrc = useMemo(() => {
    if (!folder?.statusIcons) return undefined;
    return folder.statusIcons[folder.status] || folder.statusIcons.locked;
  }, [folder]);

  // Debug: helps verify which SVG is used for each folder on render/hover
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug('[FolderCard] render', { id: folder.id, status: folder.status, hovered: isHovered, folderSrc: folderImageSrc, statusSrc: statusImageSrc });
  }

  return (
    <div className="folder-card">
      <div
        className={`folder-container ${folder.unlocked ? 'unlocked' : 'locked'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {folderImageSrc && (
          <img className="folder-svg" src={folderImageSrc} alt={folder.title} draggable={false} />
        )}
      </div>
      {statusImageSrc && (
        <img className="folder-status-img" src={statusImageSrc} alt="status" draggable={false} />
      )}
    </div>
  );
}

export default FolderCard;