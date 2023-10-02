import Score from "../gameObjects/Score";

export default class YourScoreScene extends Phaser.Scene {

    private _score: Score

    constructor() {
        super({ key: "YourScoreScene"});

      }

    init(data) {
        this._score = data.score;
    }

    public preload() {
    }
  
    public create() {
      console.log(this._score)

        
    }

    public update(){

    }

  }