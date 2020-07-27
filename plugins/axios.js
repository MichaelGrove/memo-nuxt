const getUser = () => {
	try {
		return JSON.parse(localStorage.getItem('user'))
	} catch (e) {
		return null
	}
}

export default function ({ $axios, redirect }) {
	const user = getUser()
	if (user && user.token) {
		$axios.setToken(user.token, 'Bearer')
	}

	$axios.onError((error) => {
		if (error.response.status === 500) {
			redirect('/')
		} else if (error.response.status === 403) {
			$axios.removeToken()
			localStorage.removeItem('user')
			redirect('/')
		} else if (error.response.status === 422) {
			const { errors } = error.response.data
			if (errors && errors.length > 0) {
				window.alert(JSON.stringify(errors[0].msg))
			}
		}
	})
}
