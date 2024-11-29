export interface Rate {
  id: number
  contentId: number
  userId: number
  score: number
  comment: string
  rgDtm: string
  updtDtm: string
}

export interface RateParams {
  contentId: number
}