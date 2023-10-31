
export type Alert = {
  variant?: string,
  message?: string
}

export type AuxFormatColumn = {
  name: string,
  listPosition: number,
  formPosition: number,
  type: string,
  primaryKey: boolean,
  default: string,
  required: boolean,
  label: string,
  fieldMd: number,
  minlength: number,
  maxlength: number
}

export type AuxFormat = {
  listHeader: string,
  itemHeader: string,
  columns: AuxFormatColumn[]
}

export type SelectOption = {
  value: string,
  text: string
}

export type Session = {
  user_id?: number,
  user_name?: string,
  user_role?: string,
  auth_access?: string,
  auth_token?: string,
  tenant_cod?: string,
  tenant_name?: string,
  selectOptions?: string,
  alert?: Alert
}
