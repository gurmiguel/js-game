export const buttonIndex = 9

export function handleOn(keysPressed) {

  return {
    restart: 1,
  }
}

export function handleOff(keysPressed) {
  return {
    restart: keysPressed['restart'] ? 2 : false,
  }
}