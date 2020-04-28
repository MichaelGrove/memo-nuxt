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
	addCategory (state, category) {
		state.categories = [category, ...state.categories]
	},
	updateCategory (state, category) {
		state.categories = state.categories.map(item => item.cid === category.cid ? category : item)
	},
	removeCategoryById (state, cid) {
		state.categories = state.categories.filter(category => category.cid !== cid)
	},
	addMemo (state, memo) {
		state.memos = [memo, ...state.memos]
	},
	updateMemo (state, memo) {
		state.memos = state.memos.map(item => item.mid === memo.mid ? memo : item)
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
			if (data.token) {
				setToken(data.token)
				this.$axios.setToken(data.token, 'Bearer')
				this.$router.push('/')
			} else {
				window.alert('Unexpected error')
			}
		}).catch((err) => {
			// eslint-disable-next-line no-console
			console.warn(err)
			return false
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
	createCategory (state, category) {
		this.$axios.post('/category/create', category)
			.then((response) => {
				if (response.data && response.data.success) {
					this.$router.push('/category')
					if (response.data.data) {
						this.commit('addCategory', response.data.data)
					}
				} else {
					return Promise.reject(new Error('Unexpected error'))
				}
			})
			.catch((err) => {
				// eslint-disable-next-line no-console
				console.warn(err)
				return false
			})
	},
	updateCategory (state, data) {
		const cid = data.cid
		const category = data.category
		this.$axios.post(`/category/update/${cid}`, category)
			.then((response) => {
				if (response.data && response.data.success) {
					this.$router.push('/category')
					if (response.data.data) {
						this.commit('updateCategory', response.data.data)
					}
				} else {
					return Promise.reject(new Error('Unexpected error'))
				}
			})
			.catch((err) => {
				// eslint-disable-next-line no-console
				console.warn(err)
				return false
			})
	},
	removeCategoryById (state, id) {
		if (!id) {
			return
		}

		this.$axios.post(`/category/delete/${id}`)
			.then((response) => {
				if (response.data && response.data.success) {
					this.$router.push('/category')
					state.commit('removeCategoryById', id)
				} else {
					return Promise.reject(new Error('Unexpected error'))
				}
			})
			.catch((err) => {
				// eslint-disable-next-line no-console
				console.warn(err)
				return false
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
				} else {
					return Promise.reject(new Error('Unexpected error'))
				}
			})
			.catch((err) => {
				// eslint-disable-next-line no-console
				console.warn(err)
				return false
			})
	},
	updateMemo (state, data) {
		const mid = data.mid
		const memo = data.memo
		this.$axios.post(`/memo/update/${mid}`, memo)
			.then((response) => {
				if (response.data && response.data.success) {
					this.$router.push('/')
					if (response.data.data) {
						this.commit('updateMemo', response.data.data)
					}
				} else {
					return Promise.reject(new Error('Unexpected error'))
				}
			})
			.catch((err) => {
				// eslint-disable-next-line no-console
				console.warn(err)
				return false
			})
	},
	removeMemoById (state, id) {
		if (!id) {
			return
		}

		this.$axios.post(`/memo/delete/${id}`)
			.then((response) => {
				if (response.data && response.data.success) {
					this.$router.push('/')
					state.commit('removeMemoById', id)
				} else {
					return Promise.reject(new Error('Unexpected error'))
				}
			})
			.catch((err) => {
				// eslint-disable-next-line no-console
				console.warn(err)
				return false
			})
	}
}
