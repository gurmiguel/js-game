export default class Renderer {
  constructor(app) {
    this.app = app
  }

  render(loopState) {
    const { ctx, viewport, registry, showFPS, background } = this.app

    const { width, height } = viewport

    ctx.clearRect(0, 0, width, height)

    background.render()

    if(showFPS) {
      ctx.font = '22px Arial'
      ctx.fillStyle = '#0b0'
      ctx.fillText(Math.ceil(loopState.fps), width - 30, 24)
    }

    [...registry.entities].reverse().map(entity => {
      ctx.save()
      entity.render(ctx)
      ctx.restore()
    })
  }
}