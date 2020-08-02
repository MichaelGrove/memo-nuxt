<template>
	<button
		class="inline-block bg-gray-200 rounded-full px-3 py-1 m-1 text-sm font-semibold lowercase font-display text-gray-700 shadow"
		@click="onClick"
	>
		<p>
			#{{ label }}
		</p>
	</button>
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
		}
	},
	methods: {
		onClick () {
			this.$emit('onClick', this.cid)
		}
	}
}
</script>
