import KeyboardInput from './keyboard'
import GamepadInput from './gamepad'

export default class Commands {
  constructor(app) {
    this.app = app

    const commands = [
      'up',
      'right',
      'down',
      'left',

      'jump',
      'dive',

      'speedBoost',

      'restart',
    ]

    this.queue = commands.reduce((keys, key) => ({[key]: false}), {})
    this.input = {...this.queue}
    this.previous = {...this.input}

    this.gamepadHandler = new GamepadInput(this.app)
    this.keyboardHandler = new KeyboardInput(this.app)
  }

  update() {
    this.gamepadHandler.update()
    this.previous = this.input
    this.input = {...this.queue}
  }

  destruct() {
    this.keyboardHandler.destruct()
  }
}