import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Box, Flex } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';

export const Navbar = () => {
	const [isFold, setIsFold] = useState(false);

	const onClickFold = useCallback(() => {
		setIsFold((prev) => !prev);
	}, []);

	const ArrowIcon = !isFold ? ArrowLeftIcon : ArrowRightIcon;

	return (
		<Box
			as={motion.nav}
			initial={{ width: 250 }}
			animate={{ width: isFold ? 50 : 250 }}
			exit={{ width: 50 }}
			overflow="hidden"
			h="100vh"
			borderRight="1px solid #e2e8f0"
		>
			<Flex direction="column">
				<Box p={4} fontWeight="bold" fontSize={20}>
					<Flex justify="space-between" align="center">
						{!isFold ? <Link to="/">SYNERGY STOCK</Link> : null}
						<Box>
							<ArrowIcon onClick={onClickFold} cursor="pointer" />
						</Box>
					</Flex>
				</Box>
				<NavItem url="/favourite-live">{isFold ? 'A' : '실시간 관심 종목'}</NavItem>
				<NavItem url="/favourite">{isFold ? 'B' : '관심 종목'}</NavItem>
			</Flex>
		</Box>
	);
};

const NavItem = ({ children, url }: { url: string; children: React.ReactNode }) => {
	return (
		<Box w="100%" _hover={{ background: 'black', color: 'white' }}>
			<Link to={url}>
				<Flex align="center" gap={4} p={4}>
					{children}
				</Flex>
			</Link>
		</Box>
	);
};
