<template>
	<div>
		<div class="flex">
			<h1 class="text-2xl font-bold my-4 font-display-bold text-dark">
				Memos
			</h1>
		</div>
		<div class="flex mb-4">
			<input
				type="text"
				class="search-input focus:outline-0 focus:bg-white focus:border-gray-300 placeholder-gray-600 w-full md:w-64"
				placeholder="Search..."
				:value="filterText"
				@input="(e) => updateMemoFilterText(e.target.value)"
			>
			<ul>
				<li v-for="category in filterCategories" :key="category.cid">
					<CategoryButton
						:cid="category.cid"
						:label="category.label"
						:can-dispose="true"
						@onDispose="disposeFilterCategory"
					/>
				</li>
			</ul>

			<nuxt-link
				v-if="isAuthenticated"
				to="/memo/create"
				class="text-highlight hover:text-highlight-hover ml-auto my-auto uppercase tracking-wider mr-8 font-bold text-gray-200 font-display rounded-full py-3 whitespace-no-wrap"
			>
				Create
			</nuxt-link>
		</div>
		<MemoList />
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import MemoList from '../components/MemoList'
import CategoryButton from '../components/CategoryButton'

export default {
	components: {
		MemoList,
		CategoryButton
	},
	computed: {
		...mapGetters({
			isAuthenticated: 'auth/isAuthenticated'
		}),
		...mapState(['memo']),
		filterCategories () {
			return this.memo.filterCategories
		},
		filterText () {
			return this.memo.filterText
		}
	},
	mounted () {
		const query = this.$route.query
		if (query.search) {
			this.updateMemoFilterText(query.search)
		}
	},
	methods: {
		updateMemoFilterText (value) {
			const val = String(value)
			this.$router.push({ query: { search: val } })
			this.$store.commit('memo/SET_FILTER_TEXT', val)
		},
		disposeFilterCategory (cid) {
			this.$store.commit('memo/REMOVE_FILTER_CATEGORY', Number(cid))
		}
	}
}
</script>
