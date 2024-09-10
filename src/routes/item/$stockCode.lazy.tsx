import { CalendarIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Select, Table, Tbody, Td, Text, Thead } from '@chakra-ui/react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

import { LineChart } from '@/components/lineChart';
import { usePriceHistoryByPeriod } from '@/queries/price/query.ts';

import styles from './styles.module.css';

export const Route = createLazyFileRoute('/item/$stockCode')({
	component: Index,
});

function Index() {
	const { stockCode } = Route.useParams();

	const formattedDate = (date: Date) => date.toISOString().slice(0, 10).replace(/-/g, '');

	const referenceDate = useMemo(() => {
		const today = new Date();
		const dayOfWeek = today.getDay(); // 0: 일요일, 6: 토요일

		// 조회해오는 기준 날짜를 주말 제외하도록
		if (dayOfWeek === 6) return new Date(today.setDate(today.getDate() - 1));
		if (dayOfWeek === 0) return new Date(today.setDate(today.getDate() - 2));
		return today;
	}, []);

	const getFormattedDate = (dateType: 'day' | 'year', days: number) => {
		const result = new Date(referenceDate);
		if (dateType === 'day') {
			result.setDate(result.getDate() - days);
		} else if (dateType === 'year') {
			result.setFullYear(result.getFullYear() - days);
		}
		return formattedDate(result);
	};

	const [startDate, setStartDate] = useState<string>(formattedDate(referenceDate));

	const { data } = usePriceHistoryByPeriod({
		params: {
			marketCode: 'J',
			stockCode,
			periodCode: 'D',
			orgAdjPrc: '0',
			startDate,
			endDate: formattedDate(referenceDate),
		},
		staleTime: Infinity,
	});

	const detail = data?.output1;
	const isStockDown = Number(detail?.prdy_vrss) < 0;

	const onChangeDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setStartDate(e.target.value);
	};

	return (
		<Box p={10} w="100%">
			<Flex direction="column" gap={4}>
				<Flex justifyContent="space-between" alignItems="end">
					<Flex direction="column" fontSize={11}>
						<Flex gap={2} alignItems="end">
							<Text fontWeight="bold" fontSize={20} color="#333">
								{detail?.hts_kor_isnm}
							</Text>
							<Text color="#666" fontWeight="bold">
								{stockCode}
							</Text>
						</Flex>
						<Text color="#666" fontSize={12}>
							{referenceDate.toLocaleDateString()} 기준
						</Text>
					</Flex>
					<Button size="xs" background="#fff" color="#464646" variant="outline">
						관심 종목에 추가
					</Button>
				</Flex>
				<Flex background="#fff" w="100%" h="auto" borderRadius="10px" direction="column" p="10px">
					<Flex gap={5} fontSize={16} alignItems="baseline" mb={5}>
						<Flex color={isStockDown ? '#003cff' : '#ff0000'} alignItems="baseline" gap={2}>
							<Text fontWeight="bold" fontSize={28}>
								{Number(detail?.stck_prpr).toLocaleString()}
							</Text>
							<Box
								borderLeft="7px solid transparent"
								borderRight="7px solid transparent"
								{...{ [isStockDown ? 'borderTop' : 'borderBottom']: '12px solid currentColor' }}
							/>
						</Flex>
						<Flex color="#1e1e1e" gap={3}>
							<Flex gap="5px">
								<Text>전일대비</Text>
								<Flex color={isStockDown ? '#003cff' : '#ff0000'} alignItems="baseline">
									<Text>{detail?.prdy_vrss}</Text>
									<Box
										ml="3px"
										borderLeft="5px solid transparent"
										borderRight="5px solid transparent"
										{...{ [isStockDown ? 'borderTop' : 'borderBottom']: '8px solid currentColor' }}
									/>
								</Flex>
							</Flex>
							<Box background="#ccc" w="1px" h="1.3rem" />
							<Flex gap="5px">
								<Text>등락률</Text>
								<Flex color={isStockDown ? '#003cff' : '#ff0000'} alignItems="baseline">
									<Text>{detail?.prdy_ctrt}%</Text>
								</Flex>
							</Flex>
						</Flex>
					</Flex>
					<Box w="100%" borderTop="2px solid #4d4d4d">
						<Table className={styles.tableWrapper}>
							<Thead>
								<Td>전일(원)</Td>
								<Td>시가(원)</Td>
								<Td>고가(원)</Td>
								<Td>저가(원)</Td>
							</Thead>
							<Tbody>
								<Td>{Number(detail?.stck_prdy_clpr).toLocaleString()}</Td>
								<Td>{Number(detail?.stck_oprc).toLocaleString()}</Td>
								<Td>{Number(detail?.stck_hgpr).toLocaleString()}</Td>
								<Td>{Number(detail?.stck_lwpr).toLocaleString()}</Td>
							</Tbody>
						</Table>
					</Box>
				</Flex>
				<Flex background="#fff" w="100%" h="40vh" borderRadius="10px" p="10px" direction="column" alignItems="end">
					<Box>
						<Select w="5.5rem" onChange={onChangeDate} icon={<CalendarIcon />}>
							<option value={formattedDate(referenceDate)}>1일</option>
							<option value={getFormattedDate('day', 7)}>1주일</option>
							<option value={getFormattedDate('year', 1)}>1년</option>
							<option value={getFormattedDate('year', 3)}>3년</option>
							<option value={getFormattedDate('year', 5)}>5년</option>
							<option value={getFormattedDate('year', 10)}>10년</option>
						</Select>
					</Box>
					<LineChart
						width="100%"
						height="100%"
						data={data?.output2}
						xDataKey="stck_bsop_date"
						lineDataKey="stck_clpr"
						xTickFormatter={(value) => `${value.slice(4, 6)}월 ${value.slice(6, 8)}일`}
						margin={{ top: 15 }}
					/>
				</Flex>
			</Flex>
		</Box>
	);
}
