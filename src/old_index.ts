import { Application, BitmapFont, BitmapText, Container, Graphics, ParticleContainer, Point, Sprite, Texture } from 'pixi.js'
import { RGBSplitFilter } from 'pixi-filters';
import * as particles from 'pixi-particles';
import * as particleSettings from "./particles/yellowdots.json";

//Make the stage
const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 1200,
	height: 800
});

//Make an arbitary container to show them off
const conty: Container = new Container();
conty.x = app.screen.width / 2;
conty.y = app.screen.height / 2;
app.stage.addChild(conty);

//Make a sprite
const clampy: Sprite = Sprite.from("clampy.png");
clampy.x = -276;
clampy.y = -123;
conty.addChild(clampy);

//Graphics demo (And also : WHERE THE FUCK is the container debugger)
const redBox: Graphics = new Graphics();
redBox.lineStyle(1, 0xFF0000);
redBox.drawRect(0,0, 512, 256);
conty.addChild(redBox);

//Create a new Bitmap font and register it to the font namespace
BitmapFont.from("cool text", {
	fill: [
        "#dcde54",
        "#1171bb"
    ],
    fillGradientStops: [
        0.2
    ],
    fontFamily: "\"Lucida Console\", Monaco, monospace",
    miterLimit: 4,
    stroke: "#4b49d0",
    strokeThickness: 2
});

//Actually use our new Bitmap font
const bitMapTexty: BitmapText = new BitmapText("Word Up", {
	fontName: "cool text",
	fontSize: 32
});
app.stage.addChild(bitMapTexty);

//Filter Demo
let redSplit: Point = new Point(0,0);
let greenSplit: Point = new Point(0,0);
let blueSplit: Point = new Point(0,0);
const myChromSplitFilter = new RGBSplitFilter(redSplit, greenSplit, blueSplit);
clampy.filters = [myChromSplitFilter];

//Particle Demo
const particleContainer = new ParticleContainer();
app.stage.addChild(particleContainer);

const emitter = new particles.Emitter(particleContainer, Texture.from('../static/particles/spark.png'), particleSettings);
emitter.autoUpdate = true;
emitter.updateSpawnPos(100,100);
emitter.emit = true;

//Execution code and demo manipulation
app.ticker.add(() => {
	conty.rotation += 0.01;
	if(Math.floor(conty.rotation) % 2){
		bitMapTexty.text = "Bird Up";
	}else{
		bitMapTexty.text = "Word Up";
	}
	redSplit.x = Math.sin(conty.rotation) * 8;
	blueSplit.y = Math.sin(conty.rotation * -1) * 8;
});