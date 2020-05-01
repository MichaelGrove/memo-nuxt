import { getToken } from '../plugins/token'

export default function ({ redirect }) {
	if (!getToken()) {
		redirect('/login')
	}
}
