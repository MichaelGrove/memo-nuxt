<template>
	<div class="mx-4">
		<div class="flex">
			<h1 class="text-2xl font-bold my-4 font-display-bold text-dark">
				Categories
			</h1>

			<nuxt-link
				to="/category/create"
				class="text-highlight hover:text-highlight-hover ml-auto my-auto uppercase tracking-wider mr-8 font-bold text-gray-200 font-display rounded-full py-3 whitespace-no-wrap"
			>
				Create
			</nuxt-link>
		</div>
		<CategoryList />
	</div>
</template>

<script>
import CategoryList from '../../components/category/CategoryList'

export default {
	middleware: 'auth-required',
	components: {
		CategoryList
	}
}
</script>
