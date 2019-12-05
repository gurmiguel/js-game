import Player from './Player/entity'
import Fruit from './Fruit/entity'
import Bullet from './Bullet/entity'

export default class EntitiesRegistry {
  constructor(app) {
    this.app = app
    this.entities = []

    const { world } = this.app

    this.entities.push(new Player(app,world.x,world.y,15,15))
    this.generateFruit()

    this.setFruitGeneratorTimer()
    this.setBulletGeneratorTimer()
  }

  setFruitGeneratorTimer() {
    if(this.fruitTimer)
      clearInterval(this.fruitTimer)
    this.fruitTimer = setInterval(() => {
      if(this.app.stopped)
        return
      this.generateFruit()
    },5000)
  }

  generateFruit() {
    const { world } = this.app
   
    this.setFruitGeneratorTimer()

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

  setBulletGeneratorTimer() {
    if(this.bulletTimer)
      clearInterval(this.bulletTimer)
    this.bulletTimer = setInterval(() => {
      if(this.app.stopped)
        return
      this.generateBullet()
    },2000)
  }

  generateBullet() {
    const { world } = this.app

    const bullet = new Bullet(
      this.app,
      world.width,
    )

    bullet.registerDestroy((bullet) => {
      this.entities.splice(this.entities.findIndex(entity => entity.id === bullet.id), 1)
    })

    this.entities.push(bullet)
  }

  update() {
    this.entities.forEach(entity => entity.update())
  }

  destruct() {
    this.entities.forEach(entity => entity.destruct?.())
    this.entities = []

    clearInterval(this.fruitTimer)
    clearInterval(this.bulletTimer)
  }
}