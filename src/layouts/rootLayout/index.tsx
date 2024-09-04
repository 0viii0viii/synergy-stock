import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from '@tanstack/react-router';
import { useState } from 'react';

import { Navbar } from '@/components/navbar';
import { SearchBar } from '@/components/searchBar';

export const RootLayout = () => {
	const [isOpen, setIsOpen] = useState<boolean>(true);

	return (
		<>
			<Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
			<Flex
				flexDirection="column"
				flexGrow="1"
				position="absolute"
				inset={isOpen ? '0px 0px 0px 15rem' : '0 0 0 3.5rem'}
				transition="0.3s"
			>
				<Box as="header" position="sticky" zIndex="10" h={14} bg="white" p={4}>
					<Flex align="center" justify="center" h="100%">
						<SearchBar />
					</Flex>
				</Box>
				<Flex h="100%" background="#F7F8FC">
					<Outlet />
				</Flex>
			</Flex>
		</>
	);
};
