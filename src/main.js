import './style.css'
import Phaser from 'phaser';

// uvoz scen
import UIScene from './scenes/UIScene';
import PreloadScene from './scenes/preloadScene';
import MenuScene from './scenes/menuScene';
import LabScene from './scenes/labScene';
import TestScene from './scenes/testScene';
import LoginScene from './scenes/loginScene';
import ScoreboardScene from './scenes/scoreboardScene';
import WorkspaceScene from './scenes/workspaceScene';
import PhysicsPulleyScene from './scenes/physicsPulleyScene';
import AstronomyScene from "./scenes/astronomyScene.js";
import RadioactiveDecayScene from "./scenes/radioactiveDecayScene.js";
import PhysicsSelectionScene from "./scenes/physicsSelectionScene.js";

const config = {
  type: Phaser.AUTO,            
  width: window.innerWidth,                    
  height: window.innerHeight,                   
  backgroundColor: '#f4f6fa',    
  parent: 'game-container',
  dom: {
    createContainer: true
  },
  scene: [
    // uvoz scen
    MenuScene,
    LabScene,
    WorkspaceScene,
    PreloadScene,
    UIScene,
    TestScene,
    LoginScene,
    ScoreboardScene,

    // nove scene
    PhysicsSelectionScene,
    PhysicsPulleyScene,
    AstronomyScene,
    RadioactiveDecayScene
  ],
  physics: {
    default: 'arcade',           
    arcade: {
      gravity: { y: 0 },         
      debug: false               
    }
  },
  scale: {
    mode: Phaser.Scale.RESIZE,      
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};

// inicializacija igre
const game = new Phaser.Game(config);
export default game;