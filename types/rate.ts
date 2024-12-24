export interface Rate {
  id: number
  contentId: number
  userId: number
  score: number
  comment: string
  rgDtm: string
  updtDtm: string
  nickname: string
  pfImg: string
}

export interface RateParams {
  contentId: number
}