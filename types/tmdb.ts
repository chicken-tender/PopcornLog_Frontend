export interface Content {
  id: number
  title: string
  name: string
  overview: string
  posterPath: string
  releaseDate: string
  voteAverage: number
}

export interface Detail extends Content {
  adult: boolean
  genres: Array<{
    id: number,
    name: string
  }>
  originalTitle: string
  overview: string
  releaseDate: string
  runtime: number
  status: string
  voteAverage: number
}

export interface ContentResponse {
  results: Content[]
}