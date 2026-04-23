const DutyStations = {
  OFFICE: "OFFICE",
  FIELD: "FIELD",
  REMOTE: "REMOTE",
  BASE: "BASE",
} as const

export const DutyStationTypeValues = Object.values(DutyStations)
export type DutyStationType = (typeof DutyStations)[keyof typeof DutyStations]

export interface IBase {
  _id?: string
  name: string
  country: string
  state: string
  city: string
  type: DutyStationType
  isDeleteable?: boolean
  isApproved?: boolean
  createdAt?: string
  updatedAt?: string
  [key: string]: string | number | boolean | null | undefined
}
