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
				class="search-input focus:outline-0 focus:bg-white focus:border-gray-300 placeholder-gray-600 w-full md:w-64"
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
