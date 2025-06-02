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
  IsSeen: boolean // Indicates if the product has been seen
  IsLiked: boolean // Indicates if the product has been liked
  CategorizedIndex: number // Tracks when IsSeen or IsLiked has been set (higher = more recent)
}
