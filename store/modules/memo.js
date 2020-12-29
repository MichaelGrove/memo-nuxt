export const namespaced = true

export const state = () => ({
	memos: [],
	categories: [],
	filterText: '',
	filterCategories: []
})

export const mutations = {
	// memos
	SET_MEMOS (state, memos) {
		state.memos = memos
	},
	ADD_MEMO (state, memo) {
		state.memos.push(memo)
	},
	REMOVE_MEMO (state, mid) {
		state.memos = state.memos.filter(memo => memo.mid !== mid)
	},
	UPDATE_MEMO (state, memo) {
		state.memos = state.memos.map(item => item.mid === memo.mid ? memo : item)
	},

	// categories
	SET_CATEGORIES (state, categories) {
		state.categories = categories
	},
	ADD_CATEGORY (state, category) {
		state.categories.push(category)
	},
	REMOVE_CATEGORY (state, id) {
		state.categories = state.categories.filter(cat => cat.cid !== id)
	},
	UPDATE_CATEGORY (state, category) {
		state.categories = state.categories.map(item => item.cid === category.cid ? category : item)
	},

	// filters
	SET_FILTER_TEXT (state, text) {
		state.filterText = text
	},
	ADD_FILTER_CATEGORY (state, category) {
		state.filterCategories.push(category)
	},
	REMOVE_FILTER_CATEGORY (state, id) {
		state.filterCategories = state.filterCategories.filter((category) => {
			return category.cid !== id
		})
	}
}

export const actions = {
	// memos
	fetchMemos ({ commit }) {
		return this.$axios.get('/memo')
			.then(({ data }) => {
				const memos = data && Array.isArray(data.data) ? data.data : []
				commit('SET_MEMOS', memos)
				return memos
			}).catch((err) => {
				// eslint-disable-next-line no-console
				console.warn(err)
				commit('SET_MEMOS', [])
			})
	},
	createMemo ({ commit }, memo) {
		return this.$axios.post('/memo', memo)
			.then(({ data }) => {
				commit('ADD_MEMO', data.data)
				return data.data
			})
	},
	updateMemo ({ commit }, memo) {
		return this.$axios.put(`/memo/${memo.mid}`, memo)
			.then(({ data }) => {
				commit('UPDATE_MEMO', data.data)
				return data.data
			})
	},
	removeMemo ({ commit }, id) {
		return this.$axios.delete(`/memo/${id}`)
			.then(() => {
				commit('REMOVE_MEMO', id)
				return true
			})
	},

	// categories
	fetchCategories ({ commit }) {
		return this.$axios.get('/category')
			.then(({ data }) => {
				const categories = data && Array.isArray(data.data) ? data.data : []
				commit('SET_CATEGORIES', categories)
				return categories
			}).catch((err) => {
				// eslint-disable-next-line no-console
				console.warn(err)
				commit('SET_CATEGORIES', [])
			})
	},
	createCategory ({ commit }, category) {
		return this.$axios.post('/category', category)
			.then(({ data }) => {
				commit('ADD_CATEGORY', data.data)
				return data.data
			})
	},
	updateCategory ({ commit }, category) {
		return this.$axios.put(`/category/${category.cid}`, category)
			.then(({ data }) => {
				commit('UPDATE_CATEGORY', data.data)
				return data.data
			})
	},
	removeCategory ({ commit }, id) {
		return this.$axios.delete(`/category/${id}`)
			.then(() => {
				commit('REMOVE_CATEGORY', id)
				return true
			})
	}
}
