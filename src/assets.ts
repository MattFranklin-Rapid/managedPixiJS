import { ResolverManifest } from "pixi.js";

/**
 * This is the global manifest for all asset loading
 * Add bundles and assets here to load them into the game
 */

export const manifest:ResolverManifest = {
    bundles: [
        {
            name: 'Kitten1',
            assets:{
                'blinkSheet': './kitten1/kitten1-blink.json',
                'jumpSheet': './kitten1/kitten1-jump.json',
                'sleepSheet': './kitten1/kitten1-sleep.json'
            }
        }
    ]
}