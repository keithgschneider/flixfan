import type { Content } from './Content' // Import the Content type

export interface Product {
  BackgroundURL: string
  ContentOverrides: null | object // Can be null or an object
  Contents: Content[] // Array of Content objects
  FulfillmentLocationOverride: string
  Group: number
  HeroURL: string
  HideMetadata: boolean
  ID: string
  ImageURL: string
  Name: string
  Price: number
  Profile: string
  Providers: string[] // Array of provider names
  SynopsisOverride: string
  TagColor: string
  TagText: string
  ProductURL: string // URL for the product
}
