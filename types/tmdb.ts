export interface Content {
  id: number
  title: string
  name: string
  overview: string
  posterPath: string
  releaseDate: string
  voteAverage: number
}

export interface TMDBResponse {
  results: Content[]
}
