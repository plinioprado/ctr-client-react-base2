
export type StateSessionAlert = {
  variant?: string,
  message?: string
}

export type StateSession = {
  user_id?: number,
  user_name?: string,
  user_role?: string,
  auth_access?: string,
  auth_token?: string,
  tenant_cod?: string,
  tenant_name?: string,
  selectOptions?: string,
  alert?: StateSessionAlert
}
