<template>
	<div class="mx-4">
		<div class="flex">
			<h1 class="text-2xl font-bold my-4 font-display">
				Categories
			</h1>

			<nuxt-link
				to="/category/create"
				class="form-button ml-auto my-auto bg-green-500 hover:bg-green-500 focus:outline-none focus:shadow-outline"
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
