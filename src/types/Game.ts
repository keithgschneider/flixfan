export interface Game {
  ID: string // Unique identifier for the game
  CampaignID: string // Associated campaign ID (if any)
  ProductID: string // Associated product ID (if any)
  Active: boolean // Indicates if the game is active
  Version: number // Version number of the game
  ContentID: number // Content identifier
  Title: string // Title of the game
  ParodyArtworkDescription: string // Description of the parody artwork
  OfficialArtworkURL: string // URL to the official artwork
  ParodyArtworkURL: string // URL to the parody artwork
  ProductURL: string // URL to the product (if applicable)
  ContentRating: string // Content rating (e.g., G, PG, etc.)
  TrailerVideoID: string // ID of the trailer video
  SharedDiscountCode: string // Discount code (if applicable)
  DiscountDescription: string // Description of the discount
  DiscountPercent: number // Discount percentage
  ReleaseDate: string // Release date in UTC format
  Hints: string[] // Array of hints related to the game
  LastUpdated: number // Timestamp of the last update
}
