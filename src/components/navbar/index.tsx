import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { useCallback } from 'react';

type NavbarProps = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Navbar = ({ isOpen, setIsOpen }: NavbarProps) => {
	const onClickOpen = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	return (
		<Box overflow="hidden" w="15rem" h="100vh" borderRight="1px solid #EBEEF3">
			<Flex direction="column">
				<Box p={4} fontWeight="bold" fontSize={19}>
					<HamburgerIcon onClick={onClickOpen} mr="1rem" cursor="pointer" w={6} h={6} />
					<Link to="/">SYNERGY STOCK</Link>
				</Box>
				<NavItem url="/favourite-live">{isOpen ? '실시간 관심 종목' : 'A'}</NavItem>
				<NavItem url="/favourite">{isOpen ? '관심 종목' : 'B'}</NavItem>
			</Flex>
		</Box>
	);
};

const NavItem = ({ children, url }: { url: string; children: React.ReactNode }) => {
	return (
		<Box m={2} _hover={{ background: '#8850F1', color: 'white', borderRadius: '10px', transition: '0.2s' }}>
			<Link to={url}>
				<Flex align="center" gap={4} p={4}>
					{children}
				</Flex>
			</Link>
		</Box>
	);
};
