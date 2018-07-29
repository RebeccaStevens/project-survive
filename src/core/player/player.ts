/**
 * The local player.
 */

import { Input } from 'phaser';

import { IInputReceiving } from '../../types/IInputReceiving';
import { AbstractGameScene as GameScene } from '../../util';

import {
  Character,
  create as createCharacter,
  preload as preloadCharacter,
  update as updateCharacter
} from '../character/character';

export type Player<GameSceneState> =
  Character<GameSceneState> &
  IInputReceiving;

/**
 * Preload assets for this player.
 *
 * @param scene The scene the character will be in.
 */
export function preload<GameSceneState>(
  scene: GameScene<GameSceneState>
): void {
  preloadCharacter(scene);
}

/**
 * Create a local player.
 *
 * @param scene The scene the player is in.
 * @returns The player's initial state.
 */
export function create<GameSceneState>(
  scene: GameScene<GameSceneState>
): Player<GameSceneState> {
  return {
    ...createCharacter(scene),
    input: {
      moveLeft: scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.A),
      moveRight: scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.D),
      moveUp: scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.W),
      moveDown: scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.S)
    }
  };
}

/**
 * Update loop for a local player.
 *
 * @param localPlayer The current state of the player.
 * @param delta The time between this and the last frame.
 * @returns The new state of the player.
 */
export function update<GameSceneState>(
  localPlayer: Player<GameSceneState>,
  delta: number
): Player<GameSceneState> {
  // Move in x direction?
  const moveXDir =
    (localPlayer.input.moveRight === undefined || !localPlayer.input.moveRight.isDown ? 0 : 1) -
    (localPlayer.input.moveLeft === undefined || !localPlayer.input.moveLeft.isDown ? 0 : 1) as (-1 | 0 | 1);

  // Move in y direction?
  const moveYDir =
    (localPlayer.input.moveDown === undefined || !localPlayer.input.moveDown.isDown ? 0 : 1) -
    (localPlayer.input.moveUp === undefined || !localPlayer.input.moveUp.isDown ? 0 : 1) as (-1 | 0 | 1);

  // Return an updated player.
  return {
    ...localPlayer,
    ...updateCharacter(localPlayer, moveXDir, moveYDir, delta)
  };
}
