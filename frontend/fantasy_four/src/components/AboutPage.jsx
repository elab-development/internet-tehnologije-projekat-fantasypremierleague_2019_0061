import React from 'react';
import NavigationMenu from './NavigationMenu';
import BackgroundImageRotator from './BackgroundImageRotator';
import '../css/AboutPage.css';

const AboutPage = () => {
    return (
        <>
        <NavigationMenu />
        <BackgroundImageRotator>
        
            <h1 className='heading'>About the game</h1>
            <h3>The beginning</h3>
            <p>The Fantasy Premier League (FPL) is a virtual football management game that allows fans to immerse themselves in the thrilling world of English Premier League (EPL) football. Launched in the 2002-2003 season, the game has grown exponentially in popularity, captivating millions of football enthusiasts globally. The concept is simple yet enticing – participants assemble their dream team of real-life EPL players and compete against friends, colleagues, and fellow fans to see who can manage their squad most effectively.</p>
            <h3>The rules</h3>
            <p>The rules of the Fantasy Premier League are designed to mirror the real-world dynamics of football. Participants start with a fixed budget to build their squad, selecting players from different teams and positions. Each player is assigned a price based on their real-life performance and potential in the game. The challenge lies in creating a balanced team within the given budget constraints, considering factors such as player form, fixtures, and injuries.

As the EPL season progresses, participants earn points based on the actual performances of their chosen players. Goals, assists, clean sheets, and saves contribute positively to a team's score, while conceding goals, receiving yellow and red cards, and missing penalties result in point deductions. Managers also face the strategic dilemma of choosing a captain each gameweek, whose points are doubled, adding an extra layer of complexity to team management.

The game incorporates a transfer system, allowing managers to make changes to their squad between gameweeks. However, excessive transfers come at a cost, deducting points from the overall score. This encourages strategic planning and forces managers to think long-term.</p>
<h3>The future</h3>
<p>As the Fantasy Premier League continues to thrive, its future appears promising. The game's popularity has led to the creation of vibrant online communities, where fans share tips, discuss strategies, and engage in friendly banter. The FPL has become a significant aspect of the overall football experience, enhancing fan engagement and creating a unique form of competition that transcends geographical boundaries.

The FPL's organizers frequently introduce new features and enhancements to keep the game fresh and engaging. From chips that allow managers to play strategically during specific gameweeks to dynamic pricing systems that reflect player popularity, the game evolves each season, maintaining its allure.

Furthermore, the FPL's influence extends beyond casual fun; many football clubs and players actively participate in the game, adding an extra layer of excitement as fans compete against their idols. The Fantasy Premier League has become an integral part of the footballing ecosystem, blending virtual and real-world experiences to create a unique and enduring form of sports entertainment.</p>
        </BackgroundImageRotator>
        </>
    );
};

export default AboutPage;