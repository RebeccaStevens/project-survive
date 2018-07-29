/**
 * The scene for the game play.
 */

import {
  AbstractGameScene as GameScene,
  createScene
} from '../../util';

import {
  create as createPlayer,
  Player,
  preload as preloadPlayer,
  update as updatePlayer
} from '../player/player';

export type Scene = GameScene<ISceneState>;

interface ISceneState {
  readonly actors: {
    readonly localPlayer?: Player<ISceneState>;
  };
}

/**
 * The initial state of the scene.
 */
const initialState: ISceneState = {
  actors: {
  }
};

/**
 * The game play scene.
 */
export const GAMEPLAY = createScene(
  'GamePlay',
  initialState,
  preload,
  create,
  update
);

/**
 * Preload assets.
 */
function preload(scene: Scene): void {
  preloadPlayer(scene);
}

/**
 * Create the scene.
 */
function create(scene: Scene): ISceneState {
  return {
    actors: {
      localPlayer: createPlayer(scene)
    }
  };
}

/**
 * Update loop for the scene.
 */
function update(scene: Scene, time: number, delta: number): ISceneState {
  // Get the updated scene.
  return {
    ...scene.state,
    actors: {
      ...scene.state.actors,

      // Update the local player if there is one.
      localPlayer: scene.state.actors.localPlayer === undefined
        ? scene.state.actors.localPlayer
        : updatePlayer(scene.state.actors.localPlayer, delta)
    }
  };
}
