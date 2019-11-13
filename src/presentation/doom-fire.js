const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]

export default class DoomFire {
  constructor(app) {
    this.app = app

    const { world } = this.app

    this.width = world.width - world.x
    this.height = 250

    this.backgroundImage = this.app.ctx.createImageData(this.width, this.height)
    this.creteFireData()
    this.createFireSource()
  }

  creteFireData() {
    const { width, height } = this.getSize()

    const pixels = width * height

    this.firePixelsMatrix = Array(pixels).fill(0)
  }

  createFireSource() {
    const { width, height } = this.getSize()

    const overflowPixelIndex = width * height
    for (let column = 0; column <= width; column++) {
      const pixelIndex = (overflowPixelIndex - width) + column

      this.firePixelsMatrix[pixelIndex] = 36
    }
  }

  calculateFirePropagation() {
    const { width, height } = this.getSize()

    for (let column = 0; column < width; column++) {
      for (let row = 0; row < height; row++) {
        const pixelIndex = column + (width * row)

        this.updateFireIntensityPerPixel(pixelIndex)
      }
    }
  }

  updateFireIntensityPerPixel(pixelIndex) {
    const { width, height } = this.getSize()
   
    const belowPixelIndex = pixelIndex + width

    if(belowPixelIndex >= width * height)
      return

    const decay = Math.floor(Math.random() * 1.25)
    const belowPixelFireIntensity = this.firePixelsMatrix[belowPixelIndex]
    const newFireIntensity = Math.max(0, belowPixelFireIntensity - decay)

    this.firePixelsMatrix[pixelIndex - decay] = newFireIntensity
  }

  update() {
    this.calculateFirePropagation()
  }

  render() {
    const { ctx, world } = this.app

    ctx.fillStyle = '#070707'
    ctx.fillRect(0,0,world.width,world.height)

    this.firePixelsMatrix.map((fireIntensity, index) => {
      const color = fireColorsPalette[fireIntensity]
      if(!color)
        return

      this.backgroundImage.data[index * 4] = color.r
      this.backgroundImage.data[index * 4 + 1] = color.g
      this.backgroundImage.data[index * 4 + 2] = color.b
      this.backgroundImage.data[index * 4 + 3] = 255
    })

    ctx.putImageData(this.backgroundImage, 0, world.height - this.height)
  }

  getSize() {
    const { width, height } = this

    return { width, height }
  }
}