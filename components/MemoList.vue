<template>
	<section class="grid grid-cols-memo-layout gap-4">
		<MemoListItem
			v-for="memo in memos"
			:key="memo.mid"
			:mid="memo.mid"
			:title="memo.title"
			:message="memo.message"
			:categories="memo.categories"
			:created-at="memo.createdAt"
			:is-favourite="memo.isFavourite ? true : false"
			:is-private="memo.isHidden ? true : false"
		/>
	</section>
</template>

<script>
import MemoListItem from './MemoListItem'

export default {
	name: 'MemoList',
	components: {
		MemoListItem
	},
	computed: {
		memos () {
			const memos = this.$store.getters.memos
			const filterCids = this.$store.getters.memoFilterCategories.map((category) => {
				return category.cid
			})
			let memoFilterText = this.$store.getters.memoFilterText
			memoFilterText = typeof memoFilterText === 'string' ? memoFilterText.toLowerCase() : ''
			const filtered = memos.filter((memo) => {
				const title = typeof memo.title === 'string' ? memo.title.toLowerCase() : ''
				const message = typeof memo.message === 'string' ? memo.message.toLowerCase() : ''
				const categories = Array.isArray(memo.categories) ? memo.categories : []
				const hasMatchingCategory = categories.find((category) => {
					return filterCids.includes(category.cid)
				}) || false
				return (title.includes(memoFilterText) || message.includes(memoFilterText)) && (filterCids.length === 0 || hasMatchingCategory)
			})
			const sorted = filtered.sort((a, b) => {
				return this.$moment(b.createdAt).unix() - this.$moment(a.createdAt).unix()
			})
			return sorted
		}
	},
	mounted () {
		this.$store.dispatch('getMemos')
	}
}
</script>
