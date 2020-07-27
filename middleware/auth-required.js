export default function ({ redirect }) {
	if (!localStorage.getItem('user')) {
		redirect('/login')
	}
}
