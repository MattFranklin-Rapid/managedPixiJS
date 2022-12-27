import { AnimatedSprite, Assets, Container, FederatedPointerEvent, Sprite } from "pixi.js";
import { IScene } from "./scene";
import { Manager } from "../controllers/manager";

export class GameScene extends Container implements IScene {
    private kitten: Sprite;
    private kittenVelocity: number;

    private animations: AnimatedSprite[] = [];
    private frameCount: number = 0;

    constructor() {
        super();

        //This is pulled from the sprite map in kitten1.json
        //Also this inline loader sucks, chekcout th eloadANimations below for a better pattern
        this.kitten = Sprite.from("blink-04.png");

        this.kitten.anchor.set(0.5);
        this.kitten.x = Manager.width / 2;
        this.kitten.y = Manager.height / 2;
        this.addChild(this.kitten);

        this.kittenVelocity = 0.5;

        //Take all the prepared animations and load them to the stage
        this.loadAnimations().then(() => {
            this.animations.map(e => this.addChild(e));
        })
    }

    /**
     * General loader for bringing in assets for this scene
     * Used because no await in constructors is a pain in the butt
     */
    public async loadAnimations(): Promise<void>{
        await this.loadBlinkAnimation();

    }

    /**
     * Loads the blinking animation kitty
     */
    private async loadBlinkAnimation(): Promise<void> {
        //Note the load here is strictly not required, as .get would work given we already passed through the loader scene
        //BUT! The .load method is optimized to not waste duplicate loads and is recommended, even though it throws a warning annoyingly
        const blinkSheet = await Assets.load('./kitten1/kitten1-blink.json');
        const animatedKitten = new AnimatedSprite(blinkSheet.animations['blink']);
        animatedKitten.name = 'Kitty 1';
        animatedKitten.x = Manager.width / 2;
        animatedKitten.y = Manager.height / 2;
        animatedKitten.loop = false;
        animatedKitten.animationSpeed = 0.25;

        animatedKitten.on('pointertap', this.jump, animatedKitten);
        animatedKitten.interactive = true;

        this.animations.push(animatedKitten);
    }

    private jump(e: FederatedPointerEvent): void {
        console.warn(e.ctrlKey);//GO AWAY you frigging did not use error I hate you
        this.y -= 5; 
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
            this.animations[0].gotoAndPlay(0); //Again, ugly
        }
    }
}