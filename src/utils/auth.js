import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrm-token'
const TimeKey = 'hrsaas-timestamp-key'

export const getToken = () => Cookies.get(TokenKey)

export const setToken = token => Cookies.set(TokenKey, token)

export const removeToken = () => Cookies.remove(TokenKey)

export const getTimeStamp = () => Cookies.get(TimeKey)

export const setTimeStamp = () => Cookies.set(TimeKey, Date.now())
