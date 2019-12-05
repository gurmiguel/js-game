import AbstractEntity from '../AbstractEntity'
import constants from './constants'

export default class Bullet extends AbstractEntity {
  constructor(app, x, y = null) {
    if(y === null)
      y = Number.random(app.world.y,app.world.height - constants.height)
    super(app,x,y)
    this.destroyListeners = []
    this.width = constants.width
    this.height = constants.height
  }

  render(context) {
    const { world } = this.app

    context.fillStyle = '#f4b987'

    context.fillRect(this.position.x, world.height - this.position.y, this.width + 1, this.height + 1)
  }

  update() {
    const { world } = this.app

    this.position.x -= constants.moveSpeed

    if(this.position.x + this.width < world.x)
      this.triggerDestroy()

    this.position.y = this.position.y.boundary(world.y, world.height - this.height)
  }

  registerDestroy(callback) {
    this.destroyListeners.push(callback)
  }

  triggerDestroy() {
    this.destroyListeners.forEach(callback => callback(this))
  }
}