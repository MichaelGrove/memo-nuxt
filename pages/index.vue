<template>
	<div>
		<div class="flex">
			<h1 class="text-2xl font-bold my-4 font-display">
				Resources
			</h1>
			<nuxt-link
				v-if="authenticated"
				to="/memo/create"
				class="form-button ml-auto my-auto bg-green-500 hover:bg-green-500 focus:outline-none focus:shadow-outline"
			>
				Create
			</nuxt-link>
		</div>
		<div class="flex mb-4">
			<input
				type="text"
				class="search-input mr-4 focus:outline-0 focus:bg-white focus:border-gray-300 placeholder-gray-600"
				placeholder="Search..."
				:value="memoFilterText"
				@input="updateMemoFilterText"
			>
			<ul>
				<li v-for="category in memoFilterCategories" :key="category.cid">
					<CategoryButton
						:cid="category.cid"
						:label="category.label"
						:color="category.color"
						:can-dispose="true"
						@onDispose="disposeFilterCategory"
					/>
				</li>
			</ul>
		</div>
		<MemoList />
	</div>
</template>

<script>
import MemoList from '../components/MemoList'
import CategoryButton from '../components/CategoryButton'

export default {
	components: {
		MemoList,
		CategoryButton
	},
	computed: {
		authenticated () {
			return this.$store.getters.authenticated
		},
		memoFilterText () {
			return this.$store.getters.memoFilterText
		},
		memoFilterCategories () {
			return this.$store.getters.memoFilterCategories
		}
	},
	methods: {
		updateMemoFilterText (e) {
			this.$store.commit('setMemoFilterText', String(e.target.value))
		},
		disposeFilterCategory (cid) {
			this.$store.commit('removeMemoFilterCategory', Number(cid))
		}
	}
}
</script>

<style>
.title {
	font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
	'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
	display: block;
	font-weight: 300;
	font-size: 100px;
	color: #35495e;
	letter-spacing: 1px;
}

.search-input {
	@apply transition-colors duration-100 ease-in-out border border-transparent rounded-lg py-2 pr-4 pl-4 block appearance-none leading-normal w-64 rounded-lg shadow
}
</style>
