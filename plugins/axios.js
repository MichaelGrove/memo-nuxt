import { getToken, removeToken } from './token'

export default function ({ $axios, redirect }) {
	$axios.setToken(getToken(), 'Bearer')
	$axios.onError((error) => {
		if (error.response.status === 500) {
			redirect('/')
		} else if (error.response.status === 403) {
			// Unauthorized
			removeToken()
			$axios.setToken('', 'Bearer')
			redirect('/')
		} else if (error.response.status === 422) {
			const { errors } = error.response.data
			if (errors && errors.length > 0) {
				window.alert(JSON.stringify(errors[0].msg))
			}
		}
	})
}
