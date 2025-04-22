export interface Campaign {
  img: string
  imgTxt: string
  isAvailable: boolean
  isConsumed: boolean
  isProtected: boolean
  url: string
  id: string // Extracted from the URL
}
