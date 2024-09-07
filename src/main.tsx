import './index.css';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { createRoot } from 'react-dom/client';

import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const queryClient = new QueryClient();

const theme = extendTheme({
	fonts: {
		body: 'LINESeed, system-ui, sans-serif',
	},
});

createRoot(document.getElementById('root')!).render(
	<ChakraProvider theme={theme}>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</ChakraProvider>
);
