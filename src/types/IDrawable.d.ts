import { GameObjects } from "phaser";

import { IPositionable } from "./IPositionable";

export interface IDrawable<Scene> extends IPositionable<Scene> {
  readonly image: GameObjects.Image;
}
