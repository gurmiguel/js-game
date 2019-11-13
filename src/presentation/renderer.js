export default class Renderer {
  constructor(app) {
    this.app = app
  }

  render(loopState) {
    const { ctx, viewport, registry, showFPS, background } = this.app

    const { width, height } = viewport

    ctx.clearRect(0, 0, width, height)

    if(showFPS) {
      ctx.font = '22px Arial'
      ctx.fillStyle = '#0b0'
      const fpsCounter = Math.ceil(loopState.fps)
      const right = 15 * String(fpsCounter).length
      ctx.fillText(fpsCounter, width - right, 24)
    }

    [...registry.entities].reverse().map(entity => {
      ctx.save()
      entity.render(ctx)
      ctx.restore()
    })
  }
}