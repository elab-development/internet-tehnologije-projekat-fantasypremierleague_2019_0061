import React from 'react';

const GameDataBox  = ({stat, statValue}) => {
    return (
        <div>
            <p>{stat}: {statValue}</p>
        </div>
    );
};

export default GameDataBox;