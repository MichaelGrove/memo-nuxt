<template>
	<div class="grid grid-cols-memo-layout gap-4">
		<CategoryListItem
			v-for="category in categories"
			:key="category.id"
			:cid="category.cid"
			:label="category.label"
		/>
	</div>
</template>

<script>
import CategoryListItem from './CategoryListItem'

export default {
	name: 'CategoryList',
	components: {
		CategoryListItem
	},
	computed: {
		categories () {
			return this.$store.state.memo.categories
		}
	},
	mounted () {
		this.$store.dispatch('memo/fetchCategories')
	}
}
</script>
