import crypto from 'crypto'

export function addNumbers(a: number, b: number): number {
  return a + b
}

export function generateHashedPassword(password: string): string {
  // use crypto to generate hashed password
  const magicWord = 'bino'
  const hashedPassword = crypto
    .createHash('sha256')
    .update(magicWord + password)
    .digest('hex')
  return hashedPassword
}
