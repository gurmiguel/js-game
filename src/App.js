import EntitiesRegistry from './entities/registry'
import Commands from './input/commands'
import Loop from './loop'
import Renderer from './presentation/renderer'
import World from './stage/world'
import Background from './presentation/background'

let activeApp

export default class App {
  static start(canvas, targetFPS, showFPS) {
    const app = activeApp = new App(canvas, targetFPS, showFPS)

    app.tick()

    return app
  }

  constructor(canvas, targetFPS, showFPS = false) {
    this.targetFPS = targetFPS
    this.showFPS = showFPS

    this.viewport = canvas
    this.ctx = this.viewport.getContext('2d')

    this.world = new World(this)
    this.background = new Background(this)
    this.commands = new Commands(this)
    this.renderer = new Renderer(this)
    this.registry = new EntitiesRegistry(this)
  }

  tick() {
    let lastRun
    const loop = new Loop(this, (before, now) => {
      if(!lastRun || now - lastRun > 8) {
        this.background.update()
        this.commands.update()
        this.registry.update()
        lastRun = now
      }
      this.renderer.render(loop)
    })
  }

  destruct() {
    this.commands.destruct?.()
    this.renderer.destruct?.()
    this.registry.destruct?.()
  }
}