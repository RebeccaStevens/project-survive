/**
 * A playable character.
 */

import LOGO from 'assets/logo.png';

import { HEIGHT, WIDTH } from '../../config';
import { AbstractGameScene as GameScene, updateImagePosition } from '../../util';

import { IDrawable } from '../../types/IDrawable';
import { IPositionable } from '../../types/IPositionable';

export type Character<GameSceneState> =
  IDrawable<GameScene<GameSceneState>>;

/**
 * Preload assets for this character.
 *
 * @param scene The scene the character will be in.
 */
export function preload<GameSceneState>(
  scene: GameScene<GameSceneState>
): void {
  scene.load.image(LOGO, LOGO);
}

/**
 * Create a character.
 *
 * @param scene The scene the character is in.
 * @returns The character's initial state.
 */
export function create<GameSceneState>(
  scene: GameScene<GameSceneState>
): Character<GameSceneState> {
  const image = scene.add.image(WIDTH / 2, HEIGHT / 2, LOGO);

  const position: IPositionable<GameScene<GameSceneState>>['position'] =
    Object.defineProperties({}, {
      x: {
        get: () => image.x
      },
      y: {
        get: () => image.y
      }
    });

  return {
    scene,
    position,
    image
  };
}

/**
 * Update loop for a character.
 *
 * @param character The current state of the character.
 * @param delta The time between this and the last frame.
 * @returns The new state of the character.
 */
export function update<GameSceneState>(
  character: Character<GameSceneState>,
  moveXDir: number,
  moveYDir: number,
  delta: number
): Character<GameSceneState> {
  // Calculate the new position of the character.
  const x = character.position.x + moveXDir * delta;
  const y = character.position.y + moveYDir * delta;

  updateImagePosition(character.image, { x, y });

  return character;
}
