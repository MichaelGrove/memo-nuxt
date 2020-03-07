import { setToken, removeToken } from '../plugins/token'

export const state = () => ({
	authenticated: false,
	memos: [],
	categories: [],
	memoFilterText: '',
	memoFilterCategories: []
})

export const getters = {
	memos (state) {
		return state.memos
	},
	categories (state) {
		return state.categories
	},
	memoFilterText (state) {
		return state.memoFilterText
	},
	memoFilterCategories (state) {
		return state.memoFilterCategories
	},
	authenticated (state) {
		return state.authenticated
	}
}

export const mutations = {
	initMemos (state, memos) {
		state.memos = memos
	},
	initCategories (state, categories) {
		state.categories = categories
	},
	addMemo (state, memo) {
		state.memos = [memo, ...state.memos]
	},
	removeMemoById (state, mid) {
		state.memos = state.memos.filter(memo => memo.mid !== mid)
	},
	setAuthenticated (state, authenticated = false) {
		state.authenticated = authenticated
	},
	setMemoFilterText (state, text) {
		state.memoFilterText = text
	},
	addMemoFilterCategory (state, category) {
		state.memoFilterCategories = [...state.memoFilterCategories, category]
	},
	removeMemoFilterCategory (state, cid) {
		state.memoFilterCategories = state.memoFilterCategories.filter((category) => {
			return category.cid !== cid
		})
	}
}

export const actions = {
	signIn (state, payload) {
		const email = payload.email
		const password = payload.password
		return this.$axios.post('/auth/login', { email, password }).then((results) => {
			const data = results.data ? results.data : {}
			if (data.error) {
				window.alert(data.error)
			} else if (data.token) {
				setToken(data.token)
				this.$axios.setToken(data.token, 'Bearer')
				this.$router.push('/')
			} else {
				window.alert('Unexpected error')
			}
		}).catch((err) => {
			window.alert(err)
		})
	},
	signOut (state, payload) {
		removeToken()
		state.commit('setAuthenticated', false)
	},
	getMemos (state, payload) {
		return this.$axios.post('/memo', {}).then((response) => {
			const data = response.data && response.data.data ? response.data.data : []
			state.commit('initMemos', data)
			return data
		}).catch((err) => {
			// eslint-disable-next-line no-console
			console.warn(err)
			return []
		})
	},
	getCategories (state, payload) {
		return this.$axios.post('/category', {}).then((response) => {
			const data = response.data && response.data.data ? response.data.data : []
			state.commit('initCategories', data)
			return data
		}).catch((err) => {
			// eslint-disable-next-line no-console
			console.warn(err)
			return []
		})
	},
	createMemo (state, memo) {
		this.$axios.post('/memo/create', memo)
			.then((response) => {
				if (response.data && response.data.success) {
					this.$router.push('/')
					if (response.data.data) {
						this.commit('addMemo', response.data.data)
					}
				}
			})
			.catch((err) => {
				window.alert(err)
			})
	},
	removeMemoById (state, id) {
		if (!id) {
			return
		}

		this.$axios.post(`memo/delete/${id}`)
			.then((response) => {
				if (response.data && response.data.success) {
					this.$router.push('/')
					state.commit('removeMemoById', id)
				} else if (response.data && response.data.error) {
					return Promise.reject(new Error(response.data.error))
				} else {
					return Promise.reject(new Error('Unexpected error'))
				}
			})
			.catch((err) => {
				window.alert(err)
			})
	}
}
