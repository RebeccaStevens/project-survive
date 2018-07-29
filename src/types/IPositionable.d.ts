import { IPosition } from './IPosition';

export interface IPositionable<Scene> {
  readonly scene: Scene,
  readonly position: IPosition;
}
