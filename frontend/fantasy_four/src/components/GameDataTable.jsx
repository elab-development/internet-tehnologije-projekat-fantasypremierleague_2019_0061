import React, { useState, useEffect } from 'react';
import GameDataBox from './GameDataBox';

const GameDataTable = () => {

  const [bestScorer, setBestScorer] = useState(null);
  const [mostGoalsPlayer, setMostGoalsPlayer] = useState(null);
  const [mostAssistsPlayer, setMostAssistsPlayer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:80/fpl_data/proxy.php');
        const data = await response.json();

        
        const overallBestScorer = getOverallBestScorer(data);
        setBestScorer(overallBestScorer);

       
        const playerWithMostGoals = getPlayerWithMostGoals(data);
        setMostGoalsPlayer(playerWithMostGoals);

        
        const playerWithMostAssists = getPlayerWithMostAssists(data);
        setMostAssistsPlayer(playerWithMostAssists);
      } catch (error) {
        console.error('Error fetching FPL data:', error);
      }
    };

    fetchData();
  }, []);

  const getOverallBestScorer = (data) => {
    if (!data || !data.elements) return null;

  
  let playerWithMostPoints = null;
  let maxPoints = 0;

 
  data.elements.forEach((player) => {
    if (player.total_points > maxPoints) {
      maxPoints = player.total_points;
      playerWithMostPoints = player;
    }
  });

  console.log(playerWithMostPoints.web_name);
  return playerWithMostPoints ? playerWithMostPoints.web_name : '';
  };

  const getPlayerWithMostGoals = (data) => {
    if (!data || !data.elements) return null;

  
  let playerWithMostGoals = null;
  let maxGoals = 0;

  
  data.elements.forEach((player) => {
    if (player.goals_scored > maxGoals) {
      maxGoals = player.goals_scored;
      playerWithMostGoals = player;
    }
  });

  console.log(playerWithMostGoals.web_name);
  return playerWithMostGoals ? playerWithMostGoals.web_name : '';
  };

  const getPlayerWithMostAssists = (data) => {
    if (!data || !data.elements) return null;

   
    let playerWithMostAssists = null;
    let maxAssists = 0;
  
   
    data.elements.forEach((player) => {
      if (player.assists > maxAssists) {
        maxAssists = player.assists;
        playerWithMostAssists = player;
      }
    });
    
    console.log(playerWithMostAssists.web_name);
    return playerWithMostAssists ? playerWithMostAssists.web_name : '';
  };

 
  return (
    <div>
        <GameDataBox stat="Player with most points" statValue={bestScorer}></GameDataBox>
        <GameDataBox stat="Player with most goals" statValue={mostGoalsPlayer}></GameDataBox>
        <GameDataBox stat="Player with most assists" statValue={mostAssistsPlayer}></GameDataBox>
    </div>
  );
};

export default GameDataTable;