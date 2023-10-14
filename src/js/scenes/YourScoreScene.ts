import Score from "../gameObjects/Score";


import { v4 as uuidv4 } from 'uuid';

declare const firebase: any

var firebaseConfig = {
  apiKey: "AIzaSyDTYiyAoCDSP3kjmC-CoucQTbWc4ZAbZM0",
  authDomain: "estacoes-c9bed.firebaseapp.com",
  projectId: "estacoes-c9bed",
  storageBucket: "estacoes-c9bed.appspot.com",
  messagingSenderId: "951179728056",
  appId: "1:951179728056:web:b1555e56b38d577fbbd04d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default class YourScoreScene extends Phaser.Scene {

  private leaderboard: any
  
  private userName: string

  private _score: Score
  private level: string

  constructor() {
    super({ key: "YourScoreScene" });

  }

  init(data) {
    this._score = data.score;
    this.level = data.level
    this.leaderboard = data.leaderboard
  }

  public preload() {
  }

  public create() {
    const db = firebase.firestore();

    this.userName = 'MM2'


    const userID = uuidv4(); // This generates a unique UUID as the user ID
    const newUserData = {
      score: this._score.getScore(),
      userId: userID,
      userName: this.userName,
      level: this.level,
    };

    const userDocumentRef = db.collection('leaderboard').doc(userID);

    userDocumentRef.set(newUserData)
      .then(() => {
        console.log('New user document created successfully.');
      })
      .catch((error) => {
        console.error('Error creating new user document:', error);
      });



    this.scene.start("ScoreBoardScene", {leaderboard: this.leaderboard});

  }

  public update() {

  }

}