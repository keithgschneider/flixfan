// Toggle this constant to enable or disable logging
export const LOG_MODE = false

export function log(...args: unknown[]) {
  if (LOG_MODE) {
    console.log(...args)
  }
}

export function error(...args: unknown[]) {
  if (LOG_MODE) {
    console.error(...args)
  }
}
