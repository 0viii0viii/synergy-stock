import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Box, Flex, List, ListItem } from '@chakra-ui/react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { toNumber } from 'lodash-es';

import { useInquirePrice2Queries } from '@/queries/inquirePrice2';
import { useWatchListStore } from '@/stores/watchList';

export const Route = createLazyFileRoute('/watchlist')({
	component: Watchlist,
});

const differIcons = {
	0: '- ',
	positive: <TriangleUpIcon />,
	negative: <TriangleDownIcon />,
};

const differColors = {
	0: '#000',
	positive: 'red',
	negative: 'blue',
};

function Watchlist() {
	const { watchList } = useWatchListStore();
	const queryResult = useInquirePrice2Queries(
		watchList.map((stock) => ({
			params: { marketCode: 'J', stockCode: stock.code, stockName: stock.name },
			staleTime: Infinity,
		}))
	);

	const data = queryResult.map((result) => result?.data?.output);

	return (
		<Flex p={4}>
			<Flex direction="column" flexGrow="1" bgColor="white" border="1px solid #EBEEF3" width="280px">
				{data?.map((stock) => {
					const differPrice = toNumber(stock?.stck_prpr) - toNumber(stock?.stck_prdy_clpr);
					const differRate = ((differPrice / toNumber(stock?.stck_prdy_clpr)) * 100).toFixed(2) + '%';
					const differIcon =
						differPrice === 0 ? differIcons[0] : differIcons[differPrice > 0 ? 'positive' : 'negative'];

					const differColor =
						differPrice === 0 ? differColors[0] : differColors[differPrice > 0 ? 'positive' : 'negative'];
					return (
						<List>
							<ListItem
								bg="white"
								key={stock?.name}
								height="60px"
								borderBottom="1px solid #EBEEF3"
								display="flex"
								flexDirection="column"
								px={4}
								py={2}
							>
								<Box>{stock?.name}</Box>
								<Flex flexGrow="1" align="center" justifyContent="space-between">
									<Box>{toNumber(stock?.stck_prpr).toLocaleString()}</Box>
									<Box color={differColor}>
										{differIcon}
										{toNumber(differPrice).toLocaleString()}
									</Box>
									<Box color={differColor}>{differRate}</Box>
								</Flex>
							</ListItem>
						</List>
					);
				})}
			</Flex>
		</Flex>
	);
}
