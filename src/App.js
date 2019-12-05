import EntitiesRegistry from './entities/registry'
import Commands from './input/commands'
import Loop from './loop'
import Renderer from './presentation/renderer'
import World from './stage/world'
import Background from './presentation/background'
import Player from './entities/Player/entity'

let activeApp

export default class App {
  static start(canvas, background, targetFPS, showFPS) {
    let app = activeApp = new App(canvas, background, targetFPS, showFPS)

    app.onDestroy(() => app = undefined)

    setTimeout(() => {
      app.tick()
    })

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

    this.stopped = false
    this.destructed = false

    this.destroyListeners = []
  }

  update(tframe = window.performance.now()) {
    if([2, true].includes(this.commands.input['restart']) && !this.destructed) {
      this.stopped = true
      App.start(this.viewport, this.background.viewport, this.targetFPS, this.showFPS)
      this.destruct()
    }

    if(!this.lastRun || tframe - this.lastRun > 8) {
      this.lastRun = tframe
      this.commands.update()

      if(this.stopped)
      return

      this.registry.update()
    }
  }

  tick() {
    this.loop = new Loop(this, (before, now) => {
      this.renderer.render(this.loop)
   
      this.update(now)
    })
  }

  destruct() {
    this.destructed = true
    this.loop.stop()
    
    this.loop = undefined
    this.background.destruct?.()
    this.background = undefined
    this.commands.destruct?.()
    this.commands = undefined
    this.renderer.destruct?.()
    this.renderer = undefined
    this.registry.destruct?.()
    this.registry = undefined

    this.destroyListeners.forEach(callback => callback())
  }

  onDestroy(callback) {
    this.destroyListeners.push(callback)
  }
}