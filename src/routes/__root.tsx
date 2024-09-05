import { Flex } from '@chakra-ui/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { RootLayout } from '@/layouts/rootLayout';

export const Route = createRootRoute({
	component: () => (
		<Flex>
			<ReactQueryDevtools initialIsOpen={false} />
			<RootLayout />
			<TanStackRouterDevtools />
		</Flex>
	),
});
