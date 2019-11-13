import * as keys from './keys'

export default class KeyboardInput {
  constructor(app) {
    this.app = app
    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)
  }

  onKeyDown = (e) => {
    const correspondingKey = this.getEventKeyPressed(e)

    if(!correspondingKey)
      return

    const { commands } = this.app

    const changedCommands = correspondingKey.handleOn(commands.queue)

    commands.queue = { ...commands.queue, ...changedCommands }
  }

  onKeyUp = (e) => {
    const correspondingKey = this.getEventKeyPressed(e)

    if(!correspondingKey)
      return

    const { commands } = this.app

    const changedCommands = correspondingKey.handleOff(commands.queue)

    commands.queue = { ...commands.queue, ...changedCommands }
  }

  getEventKeyPressed(e) {
    const pressedKeyCode = e.which || e.keyCode

    return Object.entries(keys).reduce((found, [ , key]) => key.keyCode === pressedKeyCode ? key : found, null)
  }

  destruct() {
    this.app.viewport.removeEventListener('keydown', this.onKeyDown)
    this.app.viewport.removeEventListener('keyup', this.onKeyUp)
  }
}