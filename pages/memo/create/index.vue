<template>
	<div class="w-full max-w-lg mx-auto">
		<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
			<h1 class="font-display font-bold mb-4 text-lg">
				Create Memo
			</h1>
			<div class="mb-4">
				<label
					for="memo_title"
					class="form-label"
				>
					Title
				</label>
				<input
					id="memo_title"
					v-model="title"
					type="text"
					class="form-input focus:outline-none focus:shadow-outline"
				/>
			</div>
			<div class="mb-4">
				<label
					for="memo_message"
					class="form-label"
				>
					Message
				</label>
				<textarea
					id="memo_message"
					v-model="message"
					type="text"
					class="form-input focus:outline-none focus:shadow-outline h-64"
				/>
			</div>

			<div class="mb-4">
				<label class="form-label">
					<input
						v-model="isFavourite"
						type="checkbox"
						class="mr-2 leading-tight"
					/>
					<span class="text-sm">
						Is Favourite
					</span>
				</label>
				<label class="form-label">
					<input
						v-model="isHidden"
						type="checkbox"
						class="mr-2 leading-tight"
					/>
					<span class="text-sm">
						Is Hidden
					</span>
				</label>
			</div>

			<div class="mb-4">
				<label class="form-label">
					Categories
				</label>
				<div class="flex mb-4">
					<select
						v-model="selectedCategoryId"
						class="form-select mr-2 focus:outline-none focus:shadow-outline"
					>
						<option></option>
						<option
							v-for="category in allCategories"
							:key="category.cid"
							:value="category.cid"
						>
							{{ category.label }}
						</option>
					</select>
					<button
						type="button"
						@click="addCategory"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							linejoin="round"
							class="text-blue-600"
						>
							<line x1="12" y1="5" x2="12" y2="19"></line>
							<line x1="5" y1="12" x2="19" y2="12"></line>
						</svg>
					</button>
				</div>
				<ul
					v-if="Array.isArray(categories) && categories.length > 0"
					class="mb-4"
				>
					<li
						v-for="category in categories"
						:key="category.cid"
						class="inline-block"
					>
						<CategoryButton
							:cid="category.cid"
							:label="category.label"
							:color="category.color"
							@onDispose="disposeCategory"
						/>
					</li>
				</ul>
				<p v-if="Array.isArray(categories) && categories.length === 0">
					This Memo currently has no categories
				</p>
			</div>

			<div class="flex items-center justify-between mt-8 pt-4 border-t-2">
				<button
					class="form-button ml-auto bg-green-500 hover:bg-green-600 focus:outline-none focus:shadow-outline"
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
import CategoryButton from '../../../components/CategoryButton'
export default {
	components: {
		CategoryButton
	},
	middleware: 'auth-required',
	data () {
		return {
			categoryFetchAttempted: false,
			title: '',
			message: '',
			isFavourite: false,
			isHidden: false,
			categories: [],
			selectedCategoryId: 0,
			allCategories: []
		}
	},
	mounted () {
		this.initCategories()
	},
	methods: {
		initCategories () {
			const categories = this.$store.getters.categories
			if (Array.isArray(categories) && categories.length > 0) {
				this.allCategories = categories
			} else if (!this.categoryFetchAttempted) {
				this.fetchCategoryItems().then(() => {
					this.initCategories()
				})
			}
		},
		fetchCategoryItems () {
			this.categoryFetchAttempted = true
			return this.$store.dispatch('getCategories', {})
		},
		getCategoryById (id) {
			return this.$store.getters.categories.find(x => x.cid === Number(id))
		},
		addCategory () {
			if (!this.selectedCategoryId) {
				return
			}
			const category = this.getCategoryById(this.selectedCategoryId)
			if (!category) {
				return
			}

			const currentCategories = Array.isArray(this.categories) ? this.categories : []
			const currentCids = currentCategories.map(c => c.cid)
			if (currentCids.includes(category.cid)) {
				window.alert('Memo already belongs to this category.')
				return
			}

			this.categories = Array.isArray(this.categories) ? [...this.categories, category] : [category]
		},
		disposeCategory (cid) {
			this.categories = this.categories.filter((category) => {
				return category.cid !== Number(cid)
			})
		},
		save () {
			const memo = {
				title: this.title,
				message: this.message,
				isFavourite: this.isFavourite ? 1 : 0,
				isHidden: this.isHidden ? 1 : 0,
				categories: this.categories.map((category) => {
					return Number(category.cid)
				})
			}

			this.$store.dispatch('createMemo', memo)
		}
	}
}
</script>
