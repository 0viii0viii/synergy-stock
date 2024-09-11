import { useQueries, useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { PARAMS } from '@/constants/params.ts';
import { InquirePrice2Params, InquirePrice2Response } from '@/queries/inquirePrice2/type.ts';
import { QueryProps } from '@/types/query.ts';
import { stockApi } from '@/utils/axios.ts';

const getInquirePrice2 = async (params: InquirePrice2Params) => {
	const { marketCode, stockCode, signal, stockName } = params;
	const res: AxiosResponse<InquirePrice2Response> = await stockApi({
		method: 'GET',
		url: '/uapi/domestic-stock/v1/quotations/inquire-price-2',
		headers: {
			tr_id: 'FHPST01010000',
			custtype: 'P',
		},
		params: {
			[PARAMS.marketCode]: marketCode,
			[PARAMS.stockCode]: stockCode,
		},
		signal,
	});
	return { ...res.data, output: { ...res.data.output, params, name: stockName } };
};

export const useInquirePrice2 = (props: QueryProps<InquirePrice2Params>) => {
	const { params, ...options } = props;
	return useQuery({
		queryKey: ['주식현재가시세2', params],
		queryFn: ({ signal }) => getInquirePrice2({ ...params, signal }),
		...options,
	}) as UseQueryResult<InquirePrice2Response>;
};

export const useInquirePrice2Queries = (props: QueryProps<InquirePrice2Params>[]) => {
	return useQueries({
		queries: props.map((query) => ({
			...query,
			queryKey: ['주식현재가시세2', query.params],
			queryFn: ({ signal }: { signal: AbortSignal }) => getInquirePrice2({ ...query.params, signal }),
		})),
	}) as UseQueryResult<InquirePrice2Response>[];
};
