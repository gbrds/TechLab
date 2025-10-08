import FolderCard from './FolderCard';
import './FolderGrid.css';

function FolderGrid({ folders }) {
  return (
    <div className="folders-grid">
      {folders.map((folder) => (
        <FolderCard key={folder.id} folder={folder} />
      ))}
    </div>
  );
}

export default FolderGrid;