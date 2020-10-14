<template>
	<div class="block mt-8 w-full mx-auto max-w-screen-sm">
		<form class="w-full bg-white rounded-lg px-16 py-8 shadow relative overflow-hidden">
			<div class="mt-4">
				<label for="email" class="form-label">Email:</label>
				<input
					id="email"
					v-model="email"
					type="text"
					class="form-input focus:outline-0 focus:bg-white focus:border-gray-300 placeholder-gray-600 "
				/>
			</div>
			<div class="mt-4">
				<label for="password" class="form-label">Password:</label>
				<input id="password" v-model="password" type="password" class="form-input focus:outline-0 focus:bg-white focus:border-gray-300 placeholder-gray-600 ">
			</div>
			<div class="mt-8">
				<button type="button" class="bg-highlight hover:bg-highlight-hover py-3 font-display uppercase font-bold text-white w-full" @click="signIn">
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
	layout: 'default',
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
