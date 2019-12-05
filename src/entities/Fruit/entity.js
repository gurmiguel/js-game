import AbstractEntity from '../AbstractEntity'
import constants from './constants'

export default class Fruit extends AbstractEntity {
  constructor(app, x, y) {
    super(app,x,y)
    this.width = constants.width
    this.height = constants.height
    this.initialPosition = { x, y }
    this.angle = 0
  }

  render(context) {
    const { world } = this.app

    context.fillStyle = '#fff'

    context.beginPath()
    context.fillStyle = constants.color
    context.shadowBlur = 6
    context.shadowColor = '#000'
    context.arc(
      this.position.x + this.width / 2,
      world.height - (this.position.y + this.height / 2),
      this.height / 2,
      0,
      2 * Math.PI,
      false
    )
    context.fill()
  }

  update() {
    const { world } = this.app

    const radius = 20
    const center = {
      x: this.initialPosition.x - (this.width / 2),
      y: this.initialPosition.y - (this.height / 2),
    }

    const randomFactor = (Number.random(0,100) - 50) / 85

    this.position.x = (radius * Math.cos((this.angle + randomFactor) * (Math.PI/180))) + center.x
    this.position.y = (radius * Math.sin((this.angle + randomFactor) * (Math.PI/180))) + center.y

    this.angle += constants.maxSpeed + randomFactor

    this.position.x = this.position.x.boundary(world.x, world.width - this.width)
    this.position.y = this.position.y.boundary(world.y, world.height - this.height)
  }
}