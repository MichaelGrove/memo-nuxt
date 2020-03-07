const AUTH_TOKEN = 'AUTH_TOKEN'

export const setToken = (token) => {
	localStorage.setItem(AUTH_TOKEN, token)
}

export const getToken = () => {
	return localStorage.getItem(AUTH_TOKEN) || ''
}

export const removeToken = () => {
	localStorage.removeItem(AUTH_TOKEN)
}
