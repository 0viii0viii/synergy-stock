import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { createLazyFileRoute } from '@tanstack/react-router';

import { usePriceHistoryByPeriod } from '@/queries/price/query.ts';

export const Route = createLazyFileRoute('/item/$stockCode')({
	component: Index,
});

function Index() {
	const { stockCode } = Route.useParams();

	const { data } = usePriceHistoryByPeriod({
		params: {
			marketCode: 'J',
			stockCode,
			periodCode: 'D',
			orgAdjPrc: '0',
			startDate: '2024-09-01',
			endDate: '2024-09-03',
		},
		staleTime: Infinity,
	});

	const detail = data?.output1;

	console.log(data);
	return (
		<Box p={10} w="100%">
			<Flex direction="column" gap={4}>
				<Flex justifyContent="space-between" alignItems="end">
					<Flex direction="column" fontSize="11px">
						<Flex gap={2} alignItems="end">
							<Text fontWeight="bold" fontSize="20px" color="#333">
								{detail?.hts_kor_isnm}
							</Text>
							<Text color="#666" fontWeight="bold">
								{stockCode}
							</Text>
						</Flex>
						<Text color="#666">{new Date().toLocaleDateString()} 기준</Text>
					</Flex>
					<Button size="xs" background="#fff" color="#464646" variant="outline">
						관심 종목에 추가
					</Button>
				</Flex>
				<Flex background="#fff" w="100%" h="13vh" borderRadius="10px" direction="column">
					<Flex>
						<Text>{Number(detail?.stck_prdy_clpr).toLocaleString()}</Text>
						<Text>전일대비</Text>
					</Flex>
				</Flex>
			</Flex>
		</Box>
	);
}
