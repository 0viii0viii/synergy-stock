import { AxiosResponse } from 'axios';

import { stockApi } from '@/utils/axios.ts';

export const retrieveWebsocketKey = async () => {
	return await stockApi({
		method: 'POST',
		url: '/oauth2/Approval',
		data: {
			grant_type: 'client_credentials',
			appkey: import.meta.env.VITE_APP_KEY,
			secretkey: import.meta.env.VITE_APP_SECRET,
		},
	});
};

type AccessTokenResponse = {
	access_token: string;
	access_token_token_expired: string;
	token_type: 'Bearer';
	expires_in: number;
};
export const retrieveAccessToken = async () => {
	const response: AxiosResponse<AccessTokenResponse> = await stockApi({
		method: 'POST',
		url: '/oauth2/tokenP',
		data: {
			grant_type: 'client_credentials',
			appkey: import.meta.env.VITE_APP_KEY,
			appsecret: import.meta.env.VITE_APP_SECRET,
		},
	});
	localStorage.setItem('access_token', response.data.access_token);
	localStorage.setItem('token_expired', response.data.access_token_token_expired);
};
