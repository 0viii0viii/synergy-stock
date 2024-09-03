import { Box, Flex } from '@chakra-ui/react';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { Navbar } from '@/components/navbar';
import { SearchBar } from '@/components/searchBar';

export const Route = createRootRoute({
	component: () => (
		<Flex>
			<Navbar />
			<Flex flexDirection="column" flexGrow="1">
				<Box as="header" position="sticky" zIndex="10" h={14} bg="white" p={4}>
					<Flex align="center" justify="center" h="100%">
						<SearchBar />
					</Flex>
				</Box>
				<Flex h="100%" background="#F7F8FC">
					<Outlet />
				</Flex>
			</Flex>
			<TanStackRouterDevtools />
		</Flex>
	),
});
