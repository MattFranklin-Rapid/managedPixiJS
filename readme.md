# Pixi JS rendering example

1) `npm install` first
2) Use `npm run start` to run locally, defaults to port 1234
3) Use `npm run build` to create the deployable webpacked package


Useful Notes

[Pixi Text](https://pixijs.io/pixi-text-style) is a quick way to build [Text](https://pixijs.download/dev/docs/PIXI.Text.html) styles
Changing Text object .text value is expensive, use [BitmapText](https://pixijs.download/dev/docs/PIXI.BitmapText.html) instead where possible (for HUD, scores, etc)

Filters are installed from `npm install pixi-filtesr` for the default filters
[These] (https://github.com/pixijs/filters) custom filters are also available, the RGB Split filter has been used here by installing `npm install @pixi/filter-rgb-split`

Particles also need to be (and have been) installed via `npm install pixi-particles`
The [Partcile Designer](https://pixijs.io/pixi-particles-editor/) is a good way to make them do what you want easily

For spritesheets I'm using [TexturePacker](https://www.codeandweb.com/texturepacker) to produce the packed sheets
These produce a JSON file that is formatted so that Pixi.js can understand it and can be seen in the assets.ts manifest file
Using it, you can reference the names directly out of the JSON, they are globally loaded by the asset loader