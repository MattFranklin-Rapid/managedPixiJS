import { Manager } from './controllers/manager';
import { LoaderScene } from './scenes/loaderScene';

//We are using a custom Manager class that extends the Pixi JS App to control both the loaded app and it sscenes

Manager.initialize(640, 480, 0x6495ed);

//Load the first scene
const loadingScene: LoaderScene = new LoaderScene();
Manager.changeScene(loadingScene);