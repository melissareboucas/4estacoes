import "phaser";
import LoaderScene from "./scenes/LoaderScene";
import MenuScene from "./scenes/MenuScene";
import TutorialScene from "./scenes/TutorialScene";
import SelectCharacterScene from "./scenes/SelectCharacterScene";
import SelectLevelScene from "./scenes/SelectLevelScene";
import ScoreBoardScene from "./scenes/ScoreBoardScene";
import CreditsScene from "./scenes/CreditsScene";
import Level1Scene from "./scenes/Level1Scene";
import Level2Scene from "./scenes/Level2Scene";
import Level3Scene from "./scenes/Level3Scene";
import Level4Scene from "./scenes/Level4Scene";
import YourScoreScene from "./scenes/YourScoreScene";
import GameOverScene from "./scenes/GameOverScene";



const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: {
        y: 10,
      },
    },
  },
  scene: [
    LoaderScene, 
    MenuScene, 
    TutorialScene, 
    SelectCharacterScene, 
    SelectLevelScene, 
    ScoreBoardScene, 
    CreditsScene, 
    Level1Scene,
    Level2Scene,
    Level3Scene,
    Level4Scene,
    YourScoreScene,
    GameOverScene
  ],
};

window.addEventListener("load", () => new Phaser.Game(config));
