<template>
	<div class="w-full max-w-lg mx-auto">
		<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
			<h1 class="font-display font-bold mb-4 text-lg">
				Create Category
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
			<div class="flex items-center justify-between">
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
			label: '',
			color: ''
		}
	},
	methods: {
		save () {
			this.$axios.post('/category/create', {
				label: this.label,
				color: this.color
			})
			// TODO update store
		}
	}
}
</script>
