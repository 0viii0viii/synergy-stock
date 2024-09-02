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
				<Box
					as="header"
					position="sticky"
					zIndex="10"
					h={14}
					color="white"
					bg="black"
					boxShadow="rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 1px 2px 1px"
					p={4}
				>
					<Flex align="center" justify="center" h="100%">
						<SearchBar />
					</Flex>
				</Box>
				<Flex>
					<Outlet />
				</Flex>
			</Flex>
			<TanStackRouterDevtools />
		</Flex>
	),
});
