import React from 'react';
import FolderCard from './FolderCard';
import './FolderGrid.css';

function FolderGrid({ folders, onFolderClick }) {
  return (
    <div className="folders-grid">
      {folders.map((folder) => (
        <FolderCard 
          key={folder.id} 
          folder={folder}
          onClick={() => {
            if (folder.unlocked && folder.status !== 'completed') {
              onFolderClick?.(folder); 
            }
          }}
        />
      ))}
    </div>
  );
}

export default FolderGrid;
