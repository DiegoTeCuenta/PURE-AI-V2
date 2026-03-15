import React from 'react';
import { usePrompt } from '../context/PromptContext';
import './Photoboard.css';

const Photoboard = () => {
  const { photoboardEntries } = usePrompt();

  return (
    <div className="photoboard-fixed">
      <div className="photoboard-title">Photoboard</div>
      <div className="photoboard-strip">
        {photoboardEntries.filter(e => e !== null).map((entry, index) => (
          <div key={index} className="photoboard-item">
            {entry.type === 'group' ? (
              <div className="photoboard-subgrid">
                {entry.icons.map((icon, i) => (
                  <img key={i} src={icon} alt="subj" className="mini-icon" />
                ))}
              </div>
            ) : (
              <img src={entry.img} alt={entry.label || 'selection'} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photoboard;
