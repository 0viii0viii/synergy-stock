import { createLazyFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';

import { retrieveAccessToken } from '@/queries/auth/api.ts';

export const Route = createLazyFileRoute('/')({
	component: Index,
});

function Index() {
	const token = localStorage.getItem('access_token');
	const tokenExpired = localStorage.getItem('token_expired');
	const isTokenExpired = tokenExpired && new Date() > new Date(tokenExpired);

	useEffect(() => {
		if (!token || isTokenExpired) retrieveAccessToken();
	}, [isTokenExpired, token]);

	return (
		<>
			<h3>HOME</h3>
		</>
	);
}
