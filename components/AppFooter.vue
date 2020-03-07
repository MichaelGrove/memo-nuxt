<template>
	<footer class="text-gray-100 bg-gray-800 text-center py-2">
		Made by Mikael Lehto © {{ year }}
	</footer>
</template>

<script>
export default {
	name: 'AppFooter',
	computed: {
		year () {
			return new Date().getFullYear()
		}
	}
}
</script>
