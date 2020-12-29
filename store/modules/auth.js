export const namespaced = true

export const state = () => ({
	user: null
})

export const getters = {
	isAuthenticated (state) {
		return !!state.user
	}
}

export const mutations = {
	SET_USER_DATA (state, userData) {
		state.user = userData
		localStorage.setItem('user', JSON.stringify(userData))
		this.$axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`
	},
	CLEAR_USER_DATA (state) {
		state.user = null
		localStorage.removeItem('user')
		delete this.$axios.defaults.headers.common.Authorization
	}
}

export const actions = {
	signIn ({ commit }, credentials) {
		return this.$axios.post('/auth/login', credentials)
			.then(({ data }) => {
				if (data.token) {
					commit('SET_USER_DATA', data)
					this.$router.push('/')
				} else {
					throw new Error('Invalid sign in credentials')
				}
			})
	},
	signOut ({ commit }) {
		commit('CLEAR_USER_DATA')
	},
	token ({ commit }) {
		return this.$axios.post('/auth/token')
			.then(({ data }) => {
				if (!data.success) {
					this.dispatch('auth/signOut')
				} else {
					const user = localStorage.getItem('user')
					if (user && typeof user === 'string') {
						commit('SET_USER_DATA', JSON.parse(user))
					}
				}
			})
			.catch(err => console.warn(err))
	}
}
