import EntitiesRegistry from './entities/registry'
import Commands from './input/commands'
import Loop from './loop'
import Renderer from './presentation/renderer'
import World from './stage/world'
import Background from './presentation/background'

let activeApp

export default class App {
  static start(canvas, background, targetFPS, showFPS) {
    const app = activeApp = new App(canvas, background, targetFPS, showFPS)

    app.update()
    app.tick()

    return app
  }

  constructor(canvas, background, targetFPS, showFPS = false) {
    this.targetFPS = targetFPS
    this.showFPS = showFPS

    this.viewport = canvas
    this.ctx = this.viewport.getContext('2d')

    this.world = new World(this)
    this.background = new Background(this, background)
    this.commands = new Commands(this)
    this.renderer = new Renderer(this)
    this.registry = new EntitiesRegistry(this)

    this.lastRun
  }

  update(tframe = window.performance.now()) {
    requestAnimationFrame(tframe => this.update(tframe))
    if(!this.lastRun || tframe - this.lastRun > 8) {
      this.lastRun = tframe
      this.commands.update()
      this.registry.update()
    }
  }

  tick() {
    const loop = new Loop(this, (before, now) => {
      this.renderer.render(loop)
    })
    let lastRun
  }

  destruct() {
    this.commands.destruct?.()
    this.renderer.destruct?.()
    this.registry.destruct?.()
  }
}