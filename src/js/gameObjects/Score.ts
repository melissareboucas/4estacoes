export default class Score extends Phaser.GameObjects.Text {

    private currentValue: integer;

    private countGameOverSore: integer;

    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene, x, y, "Score: 0", null) 
        this.setFontSize('32px');
        this.setColor('#000');

        this.scene.add
        .existing(this)

        this.currentValue = 0;
        this.countGameOverSore = 0;
    }

    public updateScore(value: integer) {
        this.currentValue = this.currentValue + value;
        this.setText("Score: " + this.currentValue.toString())
    }

    public updateGameOverScore(value: integer) {
        this.countGameOverSore = this.countGameOverSore + value;
    }

    public getGameOverScore() {
        return this.countGameOverSore;
    }
}