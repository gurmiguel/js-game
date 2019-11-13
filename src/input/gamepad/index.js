import * as keys from './keys'
import * as axes from './axes'

export default class GamepadInput {
  constructor(app) {
    this.app = app
  }

  update() {
    const { commands } = this.app
   
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);

    if(!gamepads.length)
      return

    Array(gamepads.length).fill(null).map((_, i) => {
      const gamepad = gamepads[i]

      if(!gamepad)
        return

      [...Object.entries(keys), ...Object.entries(axes)].map(([key, { axisIndex, isPressed, buttonIndex, handleOn, handleOff }]) => {
        const button = buttonIndex !== undefined ? gamepad.buttons[buttonIndex] : null
        const axis = axisIndex !== undefined ? gamepad.axes[axisIndex] : null

        if(!button && !axis){
          Object.assign(commands.queue, handleOff(commands.queue))
          return false
        }

        if(button?.pressed || isPressed?.(axis)) {
          return handleOn(commands.queue)
        } else {
          Object.assign(commands.queue, handleOff(commands.queue))
          return false
        }

      }).filter(Boolean).map(inputData => {
        Object.assign(commands.queue, inputData)
      })
    })
  }
}