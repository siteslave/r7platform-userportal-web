export interface IDrug {
  code: string
  name: string
  f43: string
  tmt: string
  created_at: string
  updated_at: string
}

export interface ICreateDrug {
  code: string
  name: string
}

export interface IUpdateDrug {
  name: string
}

export interface IMappingDrug {
  code: string
  f43: string
  tmt: string
}