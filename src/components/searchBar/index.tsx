import { Box, IconButton, Input, List, ListItem, Text } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useMemo, useRef, useState } from 'react';
import { isEmpty, map } from 'lodash-es';
import { kospiCodes } from '@/code/kospi.ts';
import { kosdaqCodes } from '@/code/kosdaq.ts';
import { useClickAway } from 'react-use';

export const SearchBar = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [isFocus, setIsFocus] = useState<boolean>(true);
	const [search, setSearch] = useState<string>('');
	const stockList = [
		...map(kospiCodes, (code) => ({ ...code, kind: '코스피' })),
		...map(kosdaqCodes, (code) => ({ ...code, kind: '코스닥' })),
	];

	useClickAway(ref, () => setIsFocus(false));

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;
		setSearch(value);
	};

	const searchList = useMemo(() => {
		return stockList.filter(({ name, code }) => {
			const normalizedSearch = search.replace(' ', '').toLowerCase();
			const normalizedName = name.replace(' ', '').toLowerCase();
			const normalizedCode = code.replace(' ', '').toLowerCase();

			return normalizedName.includes(normalizedSearch) || normalizedCode.includes(normalizedSearch);
		});
	}, [search]);

	return (
		<Box position="relative" borderBottom="1px solid #fff" ref={ref}>
			<Input
				p={0}
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
			/>
			<IconButton
				aria-label="search"
				icon={<SearchIcon color="#fff" />}
				backgroundColor="unset"
				position="absolute"
				right={0}
				_hover={{ background: 'unset' }}
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
					<List p="13px 0 12px" listStyleType="none">
						{searchList.map((el) => {
							return (
								<ListItem
									p="0 12px"
									display="flex"
									justifyContent="space-between"
									cursor="pointer"
									_hover={{ background: '#f6f6f6' }}
								>
									<Text maxW="20%">{el.code}</Text>
									<Text maxW="70%">{el.name}</Text>
									<Text>{el.kind}</Text>
								</ListItem>
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
