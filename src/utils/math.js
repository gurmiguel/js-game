export function Boundary(min, max) {
  return Math.min(Math.max(this, min), max)
}

Number.prototype.boundary = Boundary

export function Random(min, max) {
  return Math.floor(Math.random() * max) + min
}

Number.random = Random