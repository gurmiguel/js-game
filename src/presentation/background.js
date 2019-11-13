import DoomFire from "./doom-fire"

export default class Background {
  constructor(app) {
    this.app = app

    this.doomfire = new DoomFire(this.app)
  }

  update() {
    this.doomfire.update()
  }

  render() {
    this.doomfire.render()
  }
}