import './styles.module.css';

import { SearchIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Input, List, ListItem, Text } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { isEmpty, map } from 'lodash-es';
import { useMemo, useRef, useState } from 'react';
import { useClickAway } from 'react-use';

import { kosdaqCodes } from '@/code/kosdaq.ts';
import { kospiCodes } from '@/code/kospi.ts';

const stockList = [
	...map(kospiCodes, (code) => ({ ...code, kind: '코스피' })),
	...map(kosdaqCodes, (code) => ({ ...code, kind: '코스닥' })),
];

export const SearchBar = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [isFocus, setIsFocus] = useState<boolean>(true);
	const [search, setSearch] = useState<string>('');

	useClickAway(ref, () => setIsFocus(false));

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;
		setSearch(value);
	};

	const searchList = useMemo(() => {
		if (isEmpty(search)) return [];
		return stockList.filter(({ name, code }) => {
			const normalizedSearch = search.replace(' ', '').toLowerCase();
			const normalizedName = name.replace(' ', '').toLowerCase();
			const normalizedCode = code.replace(' ', '').toLowerCase();

			return normalizedName.includes(normalizedSearch) || normalizedCode.includes(normalizedSearch);
		});
	}, [search]);

	return (
		<Box position="relative" ref={ref} background="#F7F8FC" borderRadius="10px">
			<Input
				p={4}
				border="none"
				w="30rem"
				maxW="90%"
				_hover={{ cursor: 'text' }}
				_focus={{ outline: 'unset', borderColor: 'unset', boxShadow: 'none' }}
				value={search}
				onChange={onChange}
				onFocus={() => setIsFocus(true)}
				placeholder="종목명 입력"
				autoFocus={true}
				color="#000"
			/>
			<IconButton
				aria-label="search"
				icon={<SearchIcon />}
				backgroundColor="unset"
				position="absolute"
				right={0}
				_hover={{ background: 'unset', cursor: 'pointer' }}
			/>
			<Box
				display={!isEmpty(search) && isFocus ? 'block' : 'none'}
				position="absolute"
				top="3rem"
				background="#fff"
				w="30rem"
				h="auto"
				maxH="20rem"
				overflowY="auto"
				zIndex="999"
				border="1px solid #e9e9e9"
				fontSize={13}
				color="#000"
			>
				{!isEmpty(searchList) ? (
					<List listStyleType="none">
						{searchList.map((el) => {
							return (
								<Link key={el.code} to="/item/$stockCode" params={{ stockCode: el.code }} onClick={() => setSearch('')}>
									<ListItem
										p="0 12px 3px 12px"
										display="flex"
										justifyContent="space-between"
										alignItems="center"
										cursor="pointer"
										padding={4}
										_hover={{ background: '#f6f6f6' }}
										borderBottom="1px solid #e9e9e9"
									>
										<Text fontSize={16} fontWeight={500}>
											{el.name}
										</Text>
										<Flex direction="column" textAlign="end">
											<Text>{el.code}</Text>
											<Text>{el.kind}</Text>
										</Flex>
									</ListItem>
								</Link>
							);
						})}
					</List>
				) : (
					<Text p={2}>검색한 결과를 찾을 수 없습니다.</Text>
				)}
			</Box>
		</Box>
	);
};
