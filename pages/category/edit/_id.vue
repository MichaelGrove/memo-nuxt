<template>
	<div class="w-full max-w-lg mx-auto">
		<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
			<h1 class="font-display font-bold mb-4 text-lg">
				Update Category
			</h1>
			<div class="mb-4">
				<label
					for="category_label"
					class="form-label"
				>
					Label
				</label>
				<input
					id="category_label"
					v-model="label"
					type="text"
					class="form-input focus:outline-none focus:shadow-outline"
				/>
			</div>
			<div class="mb-4">
				<label
					for="category_color"
					class="form-label"
				>
					Color
				</label>
				<input
					id="category_color"
					v-model="color"
					type="text"
					class="form-input focus:outline-none focus:shadow-outline"
				/>
			</div>
			<div class="flex items-center justify-between mt-8 pt-4 border-t-2">
				<button
					type="button"
					class="form-button bg-red-500 hover:bg-red-600 focus:outline-none focus:shadow-outline"
					@click="dispose"
				>
					Delete
				</button>
				<button
					class="form-button bg-green-500 hover:bg-blue-700 focus:outline-none focus:shadow-outline"
					type="button"
					@click="save"
				>
					Save
				</button>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	middleware: 'auth-required',
	data () {
		return {
			fetchAttempted: false,
			cid: this.$route.params.id,
			label: '',
			color: ''
		}
	},
	mounted () {
		this.init()
	},
	methods: {
		init () {
			const item = this.getCategoryById(this.cid)
			if (item) {
				this.label = item.label
				this.color = item.color
			} else if (!this.fetchAttempted) {
				this.fetchCategoryItems().then(this.init)
			}
		},
		fetchCategoryItems () {
			this.fetchAttempted = true
			return this.$store.dispatch('memo/fetchCategories', {})
		},
		getCategoryById (id) {
			return this.$store.state.memo.categories.find(x => x.cid === Number(id))
		},
		save () {
			if (!this.cid) {
				return
			}

			const category = {
				cid: this.cid,
				label: this.label,
				color: this.color
			}

			this.$store.dispatch('memo/updateCategory', category)
		},
		dispose () {
			if (!this.cid) {
				return
			}

			this.$store.dispatch('memo/removeCategory', this.cid)
		}
	}
}
</script>
