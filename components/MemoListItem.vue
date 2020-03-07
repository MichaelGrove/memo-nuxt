<template>
	<div class="flex flex-col bg-white rounded-lg p-6 shadow relative overflow-hidden" :class="{ favourite: isFavourite, private: isPrivate }">
		<div class="flex">
			<h3 class="text-base flex-1 font-bold text-gray-700 font-display">
				{{ title }}
			</h3>
			<nuxt-link :to="`memo/edit/${mid}`">
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
					class="w-4 ml-2 text-gray-800"
				>
					<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
					<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
				</svg>
			</nuxt-link>
		</div>
		<div class="flex-1">
			<p class="text-gray-800 break-all">
				<MemoListItemText
					v-for="(line, i) in parsedMessage"
					:key="i"
					:type="line.type"
					:text="line.text"
				/>
			</p>
			<div class="mt-4">
				<CategoryFilterButton
					v-for="category in categories"
					:key="category.cid"
					:cid="category.cid"
					:label="category.label"
					:color="category.color"
					@onClick="onCategoryClick"
				/>
			</div>
		</div>
		<div class="mt-4">
			<p class="text-gray-600 italic text-right">
				{{ calculateTimeDifference }} days ago
			</p>
		</div>
	</div>
</template>

<script>
import CategoryFilterButton from './CategoryFilterButton'
import MemoListItemText from './MemoListItemText'

export default {
	name: 'MemoListItem',
	components: {
		CategoryFilterButton,
		MemoListItemText
	},
	props: {
		mid: {
			type: Number,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		message: {
			type: String,
			default: () => ''
		},
		createdAt: {
			type: String,
			default: () => ''
		},
		categories: {
			type: Array,
			default: () => []
		},
		isFavourite: {
			type: Boolean,
			default: () => false
		},
		isPrivate: {
			type: Boolean,
			default: () => false
		}
	},
	computed: {
		parsedMessage () {
			const ret = []
			let message = String(this.message)
			let urls = this.searchUrls(message)
			urls = urls && urls.length > 0 ? urls : []
			urls.forEach((url) => {
				const line = message.slice(0, message.indexOf(url))
				if (line) {
					ret.push({
						type: 'text',
						text: line
					})
				}
				ret.push({
					type: 'link',
					text: url.replace(/(?:\r\n|\r|\n)/g, '')
				})
				message = message.replace(line, '').replace(url, '')
			})
			if (message.length > 0) {
				ret.push({
					type: 'text',
					text: message
				})
			}
			return ret
		},
		calculateTimeDifference () {
			return this.$moment().diff(this.createdAt, 'days')
		}
	},
	methods: {
		searchUrls (message) {
			const r = new RegExp('(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))', 'g')
			return message.match(r)
		},
		onCategoryClick (cid) {
			const categories = Array.isArray(this.categories) ? this.categories : []
			const cat = categories.find((category) => {
				return category.cid === cid
			})
			if (cat) {
				this.$store.commit('addMemoFilterCategory', cat)
			}
		}
	}
}
</script>