import FolderCard from './FolderCard';
import './FolderGrid.css';

function FolderGrid({ folders, onFolderClick }) {
  return (
    <div className="folders-grid">
      {folders.map((folder) => (
        <div
          key={folder.id}
          onClick={() => onFolderClick && onFolderClick(folder)}
          style={{
            cursor: folder.unlocked ? 'pointer' : 'not-allowed',
          }}
        >
          <FolderCard folder={folder} />
        </div>
      ))}
    </div>
  );
}

export default FolderGrid;
