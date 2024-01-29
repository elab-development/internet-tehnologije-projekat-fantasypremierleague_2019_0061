import React from 'react';

const CurrentGameDataField = ({data_description, data}) => {
    return (
        <div className="game-data-box">
            <p className="game-data-description">{data_description}</p>
            <p className="game-data">{data}</p>
        </div>
    );
};

export default CurrentGameDataField;