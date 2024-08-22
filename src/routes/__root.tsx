import { Box, Flex } from '@chakra-ui/react';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
	component: () => (
		<>
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
				<Flex align="center" justify="space-between" h="100%">
					<span>왼쪽</span>
					<span>오른쪽</span>
				</Flex>
			</Box>
			<Flex>
				<Box as="nav" w="300px" h="calc(100vh - 56px)" borderRight="1px solid #e2e8f0"></Box>
				<Outlet />
			</Flex>
			<TanStackRouterDevtools />
		</>
	),
});
