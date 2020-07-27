<template>
	<div class="grid h-full grid-rows-layout">
		<header class="lg:flex px-2 py-4 lg:py-16 lg:px-8 items-center block">
			<nuxt-link to="/" class="flex items-center text-center lg:text-left">
				<span class="w-full text-3xl font-bold inline-block lg:ml-4 font-display-bold text-gray-100 whitespace-no-wrap">
					Memo App
				</span>
			</nuxt-link>
			<nav class="font-display px-8 flex-1">
				<ul class="flex items-center justify-center lg:justify-end">
					<li>
						<nuxt-link to="/" class="nav-link">
							Memos
						</nuxt-link>
					</li>
					<li v-if="isAuthenticated || false">
						<nuxt-link to="/category" class="nav-link">
							Categories
						</nuxt-link>
					</li>
				</ul>
			</nav>
			<div class="flex lg:block justify-end">
				<button
					v-if="isAuthenticated || false"
					type="button"
					class="sign-in-out"
					@click="$store.dispatch('auth/signOut')"
				>
					Sign out
				</button>
				<nuxt-link
					v-if="!(isAuthenticated || false)"
					to="/login"
					class="sign-in-out"
				>
					Sign In
				</nuxt-link>
			</div>
		</header>
		<main class="p-4 bg-gray-200">
			<nuxt />
		</main>
		<AppFooter />
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppFooter from '../components/AppFooter'

export default {
	components: {
		AppFooter
	},
	computed: {
		...mapGetters({
			isAuthenticated: 'auth/isAuthenticated'
		})
	},
	mounted () {
		this.$store.dispatch('auth/token')
	}
}
</script>
