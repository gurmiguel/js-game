export default class World {
  constructor(app) {
    this.app = app

    const { viewport } = app

    this.x = 0
    this.y = 0
    this.width = viewport.width
    this.height = viewport.height
    this.gravity = -2.1
  }
}