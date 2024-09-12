import React, { useState } from 'react';

const PlayerField = ({ player, onAddOrRemove }) => {
    const [isAdded, setIsAdded] = useState(false);

    const handleButtonClick = () => {
        onAddOrRemove(player);
        setIsAdded(!isAdded);
    };

    return (
        <div className="player-field" style={{backgroundColor: 'green', marginBottom: '3px'}}>
            <p>{player.name}</p>
            <button 
                onClick={handleButtonClick}
                style={{ backgroundColor: isAdded ? 'grey' : 'initial' }}
            >
                {isAdded ? 'Remove' : 'Add'}
            </button>
        </div>
    );
};

export default PlayerField;