import { AxiosResponse } from 'axios';
import { sortBy } from 'lodash-es';

import { PARAMS } from '@/constants/params.ts';
import { PriceHistoryByPeriodParams, PriceHistoryByPeriodResponse } from '@/queries/price/type.ts';
import { stockApi } from '@/utils/axios.ts';

// 주식 현재가 기간별 시세 (일/주/월/년)

export const getPriceHistoryByPeriod = async (params: PriceHistoryByPeriodParams & { signal: AbortSignal }) => {
	const { marketCode, stockCode, periodCode, orgAdjPrc, startDate, endDate, signal } = params;
	const res: AxiosResponse<PriceHistoryByPeriodResponse> = await stockApi({
		method: 'GET',
		url: '/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice',
		headers: {
			tr_id: 'FHKST03010100',
		},
		params: {
			[PARAMS.marketCode]: marketCode,
			[PARAMS.stockCode]: stockCode,
			[PARAMS.startDate]: startDate,
			[PARAMS.endDate]: endDate,
			[PARAMS.periodCode]: periodCode,
			[PARAMS.orgAdjPrc]: orgAdjPrc,
		},
		signal,
	});
	return { ...res.data, output2: sortBy(res.data.output2, 'stck_bsop_date') };
};
