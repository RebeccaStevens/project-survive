/**
 * Config File.
 */

import * as Phaser from 'phaser';

import { GAMEPLAY } from './core/scenes/gameplay';

export const WIDTH = 1024;
export const HEIGHT = 768;

export const CONFIG: GameConfig = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  scene: [ GAMEPLAY ]
};
