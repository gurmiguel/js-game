import uuid from 'uuid/v4'

export default class AbstractEntity {
  constructor(app, x, y) {
    this.app = app
    this.id = uuid()
    this.position = { x, y }
    this.width = 1
    this.height = 1
    this.moveSpeed = 1
    this.speed = { x: 0, y: 0 }
    this.acceleration = { x: 0.3, y: 0 }
  }

  getBoundaries() {
    const { world } = this.app

    return {
      top: world.y + this.position.y,
      left: world.x + this.position.x,
      bottom: world.y + this.position.y - this.height,
      right: world.x + this.position.x + this.width,
    }
  }

  collidesWith(entity) {
    const entityBoundaries = entity.getBoundaries()
    const boundaries = this.getBoundaries()

    return boundaries.right >= entityBoundaries.left
      && boundaries.left <= entityBoundaries.right
      && boundaries.top >= entityBoundaries.bottom
      && boundaries.bottom <= entityBoundaries.top
  }

  render(context) {
    throw { message: 'This entity `' + this.constructor.name + '` must implement render method' }
  }

  update(context) {
    throw { message: 'This entity `' + this.constructor.name + '` must implement update method' }
  }
}