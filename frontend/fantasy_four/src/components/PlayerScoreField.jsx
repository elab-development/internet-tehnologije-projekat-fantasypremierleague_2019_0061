import React, { useState } from 'react';

const PlayerScoreField = ({ player, score }) => {
    return (
        <div className="player-field">
            <p>{player.name}</p>
            <p>{score}</p>
        </div>
    );
};

export default PlayerScoreField;