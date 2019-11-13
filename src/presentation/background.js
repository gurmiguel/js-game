import DoomFire from "./doom-fire"

export default class Background {
  constructor(app, backgroundCanvas) {
    this.app = app
    this.viewport = backgroundCanvas

    this.doomfire = new DoomFire(this.app, this)
  }

  update() {
    // this.doomfire.update()
  }

  render() {
    // this.doomfire.render()
  }
}