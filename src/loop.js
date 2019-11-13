export default class Loop {
  constructor(app, loopCallback) {
    this.app = app
    this.loopCallback = loopCallback

    this.initiateLoopState()

    window.addEventListener('focus', () => {
      cancelAnimationFrame(this.stop)

      this.initiateLoopState()
      this.main()
    })

    this.stop = requestAnimationFrame(this.main)
  }

  initiateLoopState() {
    const fps = this.app.targetFPS
    const fpsInterval = 1000 / fps
    const before = window.performance.now()
    
    const cycles = {
      new: {
        frameCount: 0,
        startTime: before,
        sinceStart: 0,
      },
      old: {
        frameCount: 0,
        startTime: before,
        sinceStart: 0,
      }
    }
    const resetInterval = 5
    const resetState = 'new'

    this.fps = fps

    this.loopState = { fps, fpsInterval, before, cycles, resetInterval, resetState }
  }

  main = (tframe) => {
    this.stop = window.requestAnimationFrame(tframe => this.main(tframe))

    const { loopState } = this

    const now = tframe
    const elapsed = now - loopState.before

    if(elapsed > loopState.fpsInterval) {
      loopState.before = now - (elapsed % loopState.fpsInterval)

      Object.entries(loopState.cycles).forEach(([, cycle]) => {
        ++cycle.frameCount
        cycle.sinceStart = now - cycle.startTime
      })

      const activeCycle = loopState.cycles[loopState.resetState]
      this.fps = Math.round(1000 / (activeCycle.sinceStart / activeCycle.frameCount) * 100) / 100

      const targetResetInterval = loopState.cycles.new.frameCount === loopState.cycles.old.frameCount
        ? loopState.resetInterval * loopState.fps
        : (loopState.resetInterval * 2) * loopState.fps

      if(activeCycle.frameCount > targetResetInterval) {
        const resetCycle = loopState.cycles[loopState.resetState]
        resetCycle.frameCount = 0
        resetCycle.startTime = now
        resetCycle.sinceStart = 0

        loopState.resetState = (loopState.resetState === 'new' ? 'old' : 'new')
      }

      this.loopCallback(loopState.before, now)
    }
  }
}