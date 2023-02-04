export interface IDrugList {
  code: string
  name: string
  f43: string
  tmt: string
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