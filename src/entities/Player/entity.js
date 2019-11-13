import AbstractEntity from '../AbstractEntity'
import constants from './constants'
import Fruit from '../Fruit/entity'

export default class Player extends AbstractEntity {
  constructor(app, x, y, width, height) {
    super(app, x, y)
    this.width = width
    this.height = height
    this.consecutiveJumps = 0
    this.score = 0
    this.moveSpeed = constants.moveSpeed
  }

  render(context) {
    const { world } = this.app
    
    context.fillStyle = '#f00'
    context.fillRect(
      this.position.x,
      world.height - this.position.y - this.height, // allow to consider y = 0 for bottom
      this.width,
      this.height
    )

    context.font = '21px Arial'
    context.fillStyle = '#f55'
    context.fillText(`Score: ${this.score}`, 10, 25)
  }

  update() {
    const { commands, world, registry } = this.app
    const { input, previous } = commands

    const { accelerationFactor, maxJumps, jumpForce } = constants

    const isOnAir = this.position.y > 0

    if(input.speedBoost) {
      this.moveSpeed = constants.moveSpeed * 3
    } else {
      this.moveSpeed = constants.moveSpeed
    }

    if(input.right) {
      this.speed.x += accelerationFactor.x
    } else if(input.left) {
      this.speed.x -= accelerationFactor.x
    } else {
      if(Math.abs(this.speed.x) < accelerationFactor.x)
        this.speed.x = 0
      if(this.speed.x < 0) {
        this.speed.x += accelerationFactor.x - (isOnAir ? accelerationFactor.x/3 : 0)
      } else if (this.speed.x > 0) {
        this.speed.x -= accelerationFactor.x - (isOnAir ? accelerationFactor.x/3 : 0)
      }
    }

    if(input.jump) {
      if(this.consecutiveJumps < maxJumps && !previous.jump) {
        this.consecutiveJumps++
        this.speed.y = jumpForce
      }
    }

    if(input.dive) {
      this.acceleration.y = world.gravity * 1.2
    } else {
      this.acceleration.y = 0
    }

    if(this.position.y > 0) {
      this.speed.y += world.gravity
    }

    this.speed.y += this.acceleration.y

    this.speed.x = this.speed.x.boundary(-this.moveSpeed, this.moveSpeed)

    this.position.x += this.speed.x
    this.position.y += this.speed.y

    this.position.x = this.position.x.boundary(world.x, world.width - this.width)
    this.position.y = this.position.y.boundary(world.y, world.height - this.height)

    if(this.position.y === 0) {
      this.consecutiveJumps = 0
    }

    registry.entities.forEach((entity, index) => {
      if(!(entity instanceof Fruit))
        return
      if(!this.collidesWith(entity))
        return
      registry.entities.splice(index, 1)
      if(!registry.entities.filter(entity => entity instanceof Fruit).length)
        registry.generateFruit()
      this.score += 1
    })
  }
}