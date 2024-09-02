import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

import { getPriceHistoryByPeriod } from '@/queries/price/api.ts';
import { PriceHistoryByPeriodParams, PriceHistoryByPeriodResponse } from '@/queries/price/type.ts';

type usePriceHistoryByPeriodParams = {
	params: PriceHistoryByPeriodParams;
} & Omit<UseQueryOptions, 'queryKey' | 'queryFn'>;

export const usePriceHistoryByPeriod = (props: usePriceHistoryByPeriodParams) => {
	const { params, ...options } = props;
	return useQuery({
		queryKey: ['주식현재가일자별시세', params],
		queryFn: ({ signal }) => getPriceHistoryByPeriod({ ...params, signal }),
		...options,
	}) as UseQueryResult<PriceHistoryByPeriodResponse>;
};
