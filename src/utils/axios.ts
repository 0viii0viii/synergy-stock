import axios from 'axios';

export const stockApi = axios.create({
	baseURL: '/api',
	headers: {
		'Content-Type': 'application/json; utf-8',
		appkey: import.meta.env.VITE_APP_KEY,
		appsecret: import.meta.env.VITE_APP_SECRET,
		authorization: `Bearer ${localStorage.getItem('access_token')}`,
	},
});
