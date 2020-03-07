import { getToken } from './token'

export default function ({ $axios }) {
	$axios.setToken(getToken(), 'Bearer')
}
