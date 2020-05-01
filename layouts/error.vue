<template>
	<section>
		<h1
			v-if="error.statusCode === 404"
			class="text-2xl font-bold my-4 font-display"
		>
			Page not found
		</h1>
		<h1
			v-else
			class="text-2xl font-bold my-4 font-display"
		>
			An error occurred
		</h1>
		<nuxt-link
			to="/"
			class="text-blue-600 visited:text-purple-600 hover:underline mb-2"
		>
			Return to home page
		</nuxt-link>
	</section>
</template>

<script>
export default {
	// eslint-disable-next-line vue/require-prop-types
	props: ['error']
}
</script>
