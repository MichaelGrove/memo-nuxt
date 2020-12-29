<template>
	<div class="flex flex-col mt-8 mx-8">
		<nuxt-link to="/" class="flex items-center">
			<span class="text-2xl font-bold inline-block mx-auto font-display-bold text-gray-900">
				Memo App
			</span>
		</nuxt-link>
		<form class="flex-1 max-w-md mx-auto w-full">
			<div class="mt-4">
				<label for="email">Email:</label>
				<input id="email" v-model="email" type="text" class="login-input focus:outline-0 focus:bg-white focus:border-gray-300 placeholder-gray-600 ">
			</div>
			<div class="mt-4">
				<label for="password">Password:</label>
				<input id="password" v-model="password" type="password" class="login-input focus:outline-0 focus:bg-white focus:border-gray-300 placeholder-gray-600 ">
			</div>
			<div class="mt-4">
				<button type="button" class="btn btn-blue w-full" @click="signIn">
					Sign in
				</button>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	data: () => ({
		email: '',
		password: ''
	}),
	layout: 'login',
	methods: {
		signIn () {
			this.$store.dispatch('auth/signIn', {
				email: this.email,
				password: this.password
			})
		}
	}
}
</script>

<style>
.container {
	margin: 0 auto;
	min-height: 100vh;
}

.title {
	font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
	'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
	display: block;
	font-weight: 300;
	font-size: 100px;
	color: #35495e;
	letter-spacing: 1px;
}

.btn {
	@apply font-bold py-2 px-4 rounded;
}
.btn-blue {
	@apply bg-blue-500 text-white;
}
.btn-blue:hover {
	@apply bg-blue-700;
}

.login-input {
	@apply transition-colors duration-100 ease-in-out border border-transparent rounded-lg bg-gray-200 py-2 pr-4 pl-4 block w-full appearance-none leading-normal
}
</style>
