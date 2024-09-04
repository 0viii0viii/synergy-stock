import { Flex } from '@chakra-ui/react';
import { createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { RootLayout } from '@/layouts/rootLayout';

export const Route = createRootRoute({
	component: () => (
		<Flex>
			<RootLayout />
			<TanStackRouterDevtools />
		</Flex>
	),
});
