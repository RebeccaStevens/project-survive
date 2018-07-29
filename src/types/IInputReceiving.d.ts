import { Input } from 'phaser';

export interface IInputReceiving {
  readonly input: {
    readonly moveLeft?: Input.Keyboard.Key;
    readonly moveRight?: Input.Keyboard.Key;
    readonly moveUp?: Input.Keyboard.Key;
    readonly moveDown?: Input.Keyboard.Key;
  };
}
