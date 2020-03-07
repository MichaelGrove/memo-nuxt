<template>
	<a
		v-if="type === 'link'"
		:href="href"
		target="_blank"
		rel="nofollow"
		class="block text-blue-600 visited:text-purple-600 hover:underline mb-2"
	>
		{{ hostname }}
	</a>
	<div
		v-else
		class="block"
	>
		{{ value }}
	</div>
</template>

<script>
export default {
	name: 'MemoListItemText',
	props: {
		type: {
			type: String,
			required: true,
			validator: (value) => {
				return ['text', 'link'].includes(value)
			}
		},
		text: {
			type: String,
			required: true
		}
	},
	data () {
		return {
			href: '',
			hostname: '',
			value: ''
		}
	},
	mounted () {
		if (this.type === 'link') {
			this.hostname = this.extractHostname(this.text) || 'Host'
			this.href = this.text.replace(/(?:\r\n|\r|\n)/g, '')
		}
		this.value = this.text
	},
	methods: {
		extractHostname (url) {
			let hn = ''
			if (url.includes('//')) {
				hn = url.split('/')[2]
			} else {
				hn = url.split('/')[0]
			}
			hn = hn.split(':')[0]
			hn = hn.split('?')[0]
			return hn
		}
	}
}
</script>
