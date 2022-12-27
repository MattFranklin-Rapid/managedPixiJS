import { AnimatedSprite, Container, Sprite, Texture } from "pixi.js";
import { IScene } from "./scene";
import { Manager } from "../controllers/manager";

export class GameScene extends Container implements IScene {
    private kitten: Sprite;
    private kittenVelocity: number;

    private animatedKitten: AnimatedSprite;
    private frameCount: number = 0;

    constructor() {
        super();

        //This is pulled from the sprite map in kitten1.json
        this.kitten = Sprite.from("04blink-recovered.png");

        const blinkFrames: Texture[] = [];
        blinkFrames.push(Texture.from('01blink-anti.png'));
        blinkFrames.push(Texture.from('02blink-closed.png'));
        blinkFrames.push(Texture.from('02blink-closed.png'));
        blinkFrames.push(Texture.from('03blink-recovery.png'));
        blinkFrames.push(Texture.from('04blink-recovered.png'));

        this.animatedKitten = new AnimatedSprite(blinkFrames);
        this.animatedKitten.x = Manager.width / 2;
        this.animatedKitten.y = Manager.height / 2;
        this.animatedKitten.loop = false;
        this.animatedKitten.animationSpeed = 0.25;
        this.addChild(this.animatedKitten);

        this.kitten.anchor.set(0.5);
        this.kitten.x = Manager.width / 2;
        this.kitten.y = Manager.height / 2;
        this.addChild(this.kitten);

        this.kittenVelocity = 0.5;
    }
    public update(framesPassed: number): void {
        // Lets move!
        this.frameCount += framesPassed;
        this.kitten.x += this.kittenVelocity * framesPassed;

        if (this.kitten.x > Manager.width) {
            this.kitten.x = Manager.width;
            this.kittenVelocity = -this.kittenVelocity;
        }

        if (this.kitten.x < 0) {
            this.kitten.x = 0;
            this.kittenVelocity = -this.kittenVelocity;
        }

        if(Math.floor(this.frameCount) % 100 == 0){
            console.log('Lets Go');
            this.animatedKitten.gotoAndPlay(0);
        }
    }
}