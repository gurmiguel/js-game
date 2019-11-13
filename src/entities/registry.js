import Player from './Player/entity'
import Fruit from './Fruit/entity'

export default class EntitiesRegistry {
  constructor(app) {
    this.app = app
    this.entities = []

    const { world } = this.app

    this.entities.push(new Player(app,world.x,world.y,15,15))
    this.generateFruit()

    this.setGeneratorTimer()
  }

  setGeneratorTimer() {
    if(this.timer)
      clearInterval(this.timer)
    this.timer = setInterval(() => {
      this.generateFruit()
    },5000)
  }

  generateFruit() {
    const { world } = this.app
   
    this.setGeneratorTimer()

    this.entities.forEach((entity, index) => {
      if(!(entity instanceof Fruit))
        return
      this.entities.splice(index, 1)
    })
    this.entities.push(new Fruit(
      this.app,
      Number.random(world.x,world.width - 15),
      Number.random(world.y,world.height - 15),
    ))
  }

  update() {
    this.entities.forEach(entity => entity.update())
  }
}