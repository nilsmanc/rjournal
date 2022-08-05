import axios from 'axios'
import { GetServerSidePropsContext, NextPageContext } from 'next'
import Cookies, { parseCookies } from 'nookies'
import { UserApi } from './user'

export type ApiReturnType = {
  user: ReturnType<typeof UserApi>
}

export const Api = (ctx?: NextPageContext | GetServerSidePropsContext): ApiReturnType => {
  const cookies = ctx ? Cookies.get(ctx) : parseCookies()
  const token = cookies.rtoken

  const instance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })

  return {
    user: UserApi(instance),
  }
}
