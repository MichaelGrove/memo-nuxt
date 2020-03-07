import { getToken } from '../plugins/token'

export default function ({ store }) {
	store.commit('setAuthenticated', getToken() !== '')
}
