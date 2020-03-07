<template>
	<div class="inline-block bg-gray-200 rounded-full px-3 py-1 m-1 text-sm font-semibold lowercase font-display text-gray-700 mr-2 shadow">
		<div class="flex items-center">
			<p>
				#{{ label }}
			</p>
			<button
				v-if="canDispose"
				type="button"
				class="ml-2"
				@click="dispose"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="w-4"
				>
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CategoryButton',
	props: {
		cid: {
			type: Number,
			required: true
		},
		label: {
			type: String,
			required: true
		},
		color: {
			type: String,
			required: true
		},
		canDispose: {
			type: Boolean,
			default: () => false
		}
	},
	methods: {
		dispose () {
			if (this.canDispose) {
				this.$emit('onDispose', this.cid)
			}
		}
	}
}
</script>
