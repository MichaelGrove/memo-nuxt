<template>
	<div class="grid h-full grid-rows-layout">
		<header class="flex py-16 px-8 items-center">
			<nuxt-link to="/" class="flex items-center">
				<span class="text-2xl font-bold inline-block ml-4 font-display-bold text-gray-100">
					Memo App
				</span>
			</nuxt-link>
			<nav class="font-display px-8 flex-1">
				<ul class="flex items-center justify-end">
					<li>
						<nuxt-link to="/" class="nav-link">
							Memos
						</nuxt-link>
					</li>
					<li v-if="authenticated">
						<nuxt-link to="/category" class="nav-link">
							Categories
						</nuxt-link>
					</li>
				</ul>
			</nav>
			<button
				v-if="authenticated"
				type="button"
				class="sign-in-out"
				@click="signOut"
			>
				Sign out
			</button>
			<nuxt-link
				v-if="!authenticated"
				to="/login"
				class="sign-in-out"
			>
				Sign In
			</nuxt-link>
		</header>
		<main class="p-4 bg-gray-200">
			<nuxt />
		</main>
		<AppFooter />
	</div>
</template>

<script>
import AppFooter from '../components/AppFooter'

export default {
	components: {
		AppFooter
	},
	middleware: 'authenticated',
	computed: {
		authenticated () {
			return this.$store.getters.authenticated
		}
	},
	methods: {
		signOut () {
			this.$store.dispatch('signOut')
		}
	}
}
</script>

<style>
html {
	font-size: 16px;
	word-spacing: 1px;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	box-sizing: border-box;
}

html, body, #__nuxt, #__layout {
	height: 100%;
	width: 100%;
}
body {
	font-family: Lusitana, sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

.form-label {
	@apply block text-gray-700 text-sm font-bold mb-2 font-display
}
.form-input {
	@apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
}
.form-button {
	@apply font-bold text-gray-100 font-display rounded-full px-4 py-2
}
.form-select {
	@apply shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight
}

.favourite:before {
    content: "";
    border-left: 1rem solid #535FD7;
    top: 0;
    position: absolute;
    left: 0;
    right: 0;
    height: 3rem;
    width: 1px;
    margin-top: -0.75em;
    margin-left: 0.25rem;
    transform: rotate(45deg);
}

main {
	display: grid;
}

header {
	background: #34373c;
	background-image: url('/header-bg.jpeg');
	background-size: cover;
	background-repeat: no-repeat;
	background-position-y: center;
}

.sign-in-out {
	@apply ml-auto my-auto mr-8 font-bold text-gray-800 font-display rounded-full px-4 py-2 bg-gray-200
}

.nav-link {
	text-shadow: 1px 1px black;
	@apply block p-4 font-bold text-gray-100
}
</style>
