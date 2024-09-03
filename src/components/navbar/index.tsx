import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';

export const Navbar = () => {
	const [isFold, setIsFold] = useState(false);

	const onClickFold = useCallback(() => {
		setIsFold((prev) => !prev);
	}, []);

	return (
		<Box
			as={motion.nav}
			initial={{ width: 250 }}
			animate={{ width: isFold ? 50 : 250 }}
			exit={{ width: 50 }}
			overflow="hidden"
			h="100vh"
			borderRight="1px solid #EBEEF3"
		>
			<Flex direction="column">
				<Box p={4} fontWeight="bold" fontSize={20}>
					<HamburgerIcon onClick={onClickFold} mr="1rem" cursor="pointer" w={6} h={6} />
					{!isFold ? <Link to="/">SYNERGY STOCK</Link> : null}
				</Box>
				<NavItem url="/favourite-live">{isFold ? 'A' : '실시간 관심 종목'}</NavItem>
				<NavItem url="/favourite">{isFold ? 'B' : '관심 종목'}</NavItem>
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
