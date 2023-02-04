export interface IDrugUsage {
  code: string
  usage1: string
  usage2: string
  usage3: string
  created_at: string
  updated_at: string
}

export interface ICreateDrugUsage {
  code: string
  usage1: string
  usage2: string
  usage3: string
}

export interface IUpdateDrugUsage {
  usage1: string
  usage2: string
  usage3: string
}
