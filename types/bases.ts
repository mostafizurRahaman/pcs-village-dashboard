export interface IBase {
  id: string
  baseName: string
  country: string
  state: string
  city: string
  createdAt: string
  [key: string]: string | number | boolean | null
}
