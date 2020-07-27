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
		return this.$axios.post('/memo')
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
		return this.$axios.post('/memo/create', memo)
			.then(({ data }) => {
				const newMemo = data.data
				commit('ADD_MEMO', newMemo)
				this.$router.push('/')
			})
			.catch((err) => {
				// eslint-disable-next-line no-console
				console.warn(err)
				return false
			})
	},
	updateMemo ({ commit }, memo) {
		this.$axios.post(`/memo/update/${memo.mid}`, memo)
			.then(({ data }) => {
				const updatedMemo = data.data
				commit('UPDATE_MEMO', updatedMemo)
				this.$router.push('/')
			})
			.catch((err) => {
				// eslint-disable-next-line no-console
				console.warn(err)
				return false
			})
	},
	removeMemo ({ commit }, id) {
		return this.$axios.post(`/memo/delete/${id}`)
			.then(() => {
				this.$router.push('/')
				commit('REMOVE_MEMO', id)
			})
			.catch((err) => {
				// eslint-disable-next-line no-console
				console.warn(err)
				return false
			})
	},

	// categories
	fetchCategories ({ commit }) {
		return this.$axios.post('/category')
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
		return this.$axios.post('/category/create', category)
			.then(({ data }) => {
				const newCategory = data.data
				if (newCategory) {
					commit('ADD_CATEGORY', newCategory)
				}

				this.$router.push('/category')
				return newCategory
			})
			.catch((err) => {
				// eslint-disable-next-line no-console
				console.warn(err)
				return false
			})
	},
	updateCategory ({ commit }, category) {
		// const cid = data.cid
		// const category = data.category
		this.$axios.post(`/category/update/${category.cid}`, category)
			.then(({ data }) => {
				const updatedCategory = data.data
				commit('UPDATE_CATEGORY', updatedCategory)
				this.$router.push('/category')
			})
			.catch((err) => {
				// eslint-disable-next-line no-console
				console.warn(err)
				return false
			})
	},
	removeCategory ({ commit }, id) {
		return this.$axios.post(`/category/delete/${id}`)
			.then(() => {
				this.$router.push('/category')
				commit('REMOVE_CATEGORY', id)
			})
			.catch((err) => {
				// eslint-disable-next-line no-console
				console.warn(err)
				return false
			})
	}
}
