/**
 * Util functions.
 */

import { GameObjects, Scene } from 'phaser';

import { IPosition } from './types/IPosition';

/**
 * An Abstract Scene of the game.
 */
export abstract class AbstractGameScene<State> extends Scene {
  protected _mutableState: State;

  public constructor(initialState: State, config: string | Phaser.Scenes.Settings.Config) {
    super(config);
    this._mutableState = initialState;
  }

  public get state(): State {
    return this._mutableState;
  }
}

/**
 * Create a Scene Object.
 *
 * @param key The key for the scene
 * @param preload The preload function
 * @param create The create function
 * @param update The update loop function
 * @param initialState The initial state of the scene.
 */
export function createScene<State>(
  key: string,
  initialState: State,
  preload: (scene: AbstractGameScene<State>) => void,
  create: (scene: AbstractGameScene<State>) => State,
  update: (scene: AbstractGameScene<State>, time: number, delta: number) => State
): AbstractGameScene<State> {
  // @ts-ignore
  return class extends AbstractGameScene<State> {
    public constructor() {
      super(
        initialState,
        {
          key
        }
      );
    }

    /**
     * Preload assets.
     */
    public preload(): void {
      preload(this);
    }

    /**
     * Create the scene.
     */
    public create(): void {
      this._mutableState = create(this);
    }

    /**
     * Update loop.
     */
    public update(time: number, delta: number): void {
      this._mutableState = update(this, time, delta);
    }
  };
}

/**
 * Update the position of an image.
 *
 * @param image The image to move.
 * @param position The new position of the image
 */
export function updateImagePosition(
  image: GameObjects.Image,
  position: IPosition
): void {
  // tslint:disable:no-object-mutation
  image.x = position.x;
  image.y = position.y;
  // tslint:enable:no-object-mutation
}
