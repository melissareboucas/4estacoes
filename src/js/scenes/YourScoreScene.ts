import Score from "../gameObjects/Score";

export default class YourScoreScene extends Phaser.Scene {

    private _score: Score
    private _userName: string

    constructor() {
        super({ key: "YourScoreScene"});

      }

    init(data) {
        //this._score = data.score;
    }

    public preload() {
    }
  
    public create() {
      this._score = new Score(this, 16, 16).setDepth(1);
      this._score.updateScore(1000);
      this._userName = 'MM2'
      console.log(this._score)


      this.scene.start("ScoreBoardScene",  {score: this._score, userName: this._userName, level: "PRIMAVERA"});
        
    }

    public update(){

    }

  }