/* tslint:disable */
/* eslint-disable */
/**
*/
export enum MouseButton {
  Left,
  Right,
}
/**
*/
export enum Keycode {
  Escape,
  Backspace,
  Return,
  Space,
  PageDown,
  PageUp,
  Up,
  Down,
  Left,
  Right,
  KpEnter,
  KpMinus,
  KpPlus,
  Minus,
  Plus,
  A,
  C,
  Q,
  S,
  W,
  X,
  Y,
  Z,
  Num1,
  Num2,
  F1,
  F2,
  F3,
  F4,
  F6,
  F7,
  F8,
  F9,
}
/**
*/
export class LevelEditor {
  free(): void;
/**
* @param {WebImage} floor_texture
* @param {WebImage} walls_texture
* @param {WebImage} shadows_alpha_texture
* @param {Uint8Array} font_data
* @param {Function} show_file_upload
* @param {Function} hide_file_upload
* @returns {LevelEditor}
*/
  static new(floor_texture: WebImage, walls_texture: WebImage, shadows_alpha_texture: WebImage, font_data: Uint8Array, show_file_upload: Function, hide_file_upload: Function): LevelEditor;
/**
* @returns {number}
*/
  screen(): number;
/**
* @returns {number}
*/
  screen_width(): number;
/**
* @returns {number}
*/
  screen_height(): number;
/**
* @param {number} x
* @param {number} y
* @returns {boolean}
*/
  mouse_move(x: number, y: number): boolean;
/**
* @param {number} button
* @returns {boolean}
*/
  mouse_down(button: number): boolean;
/**
* @param {number} button
* @returns {boolean}
*/
  mouse_up(button: number): boolean;
/**
* @param {number | undefined} key
* @param {string | undefined} text
* @returns {boolean}
*/
  key_down(key?: number, text?: string): boolean;
/**
* @param {string} name
* @param {Uint8Array} data
*/
  add_level_file(name: string, data: Uint8Array): void;
/**
*/
  frame(): void;
}
/**
*/
export class WebImage {
  free(): void;
/**
* @param {number} width
* @param {number} height
* @param {Uint8Array} data
* @returns {WebImage}
*/
  static new(width: number, height: number, data: Uint8Array): WebImage;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_webimage_free: (a: number) => void;
  readonly webimage_new: (a: number, b: number, c: number, d: number) => number;
  readonly __wbg_leveleditor_free: (a: number) => void;
  readonly leveleditor_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly leveleditor_screen: (a: number) => number;
  readonly leveleditor_screen_width: (a: number) => number;
  readonly leveleditor_screen_height: (a: number) => number;
  readonly leveleditor_mouse_move: (a: number, b: number, c: number) => number;
  readonly leveleditor_mouse_down: (a: number, b: number) => number;
  readonly leveleditor_mouse_up: (a: number, b: number) => number;
  readonly leveleditor_key_down: (a: number, b: number, c: number, d: number) => number;
  readonly leveleditor_add_level_file: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly leveleditor_frame: (a: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
