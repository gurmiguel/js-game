export const keyCode = 82

export function handleOn(keysPressed) {

  return {
    restart: true,
  }
}

export function handleOff(keysPressed) {

  return {
    restart: false,
  }
}