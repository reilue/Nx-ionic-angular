export interface ResponseLogin {
  data: {
    access_token: string
    access_token_expires_at: string
    refresh_token: string
    refresh_token_expires_at: string
  }
}

export interface RequestLogin {
  grant_type: string
  username: string
  password: string
}

export interface ResponseLogout {
  data: {
    msg: string
  }
}
