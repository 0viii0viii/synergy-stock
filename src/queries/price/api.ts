import { AxiosResponse } from 'axios';

import { GetPriceHistoryResponse } from '@/queries/price/type.ts';
import { KisResponseType } from '@/types/kis.ts';
import { stockApi } from '@/utils/axios.ts';

type CurrentPriceParams = {
	marketCode: 'J'; // J = '주식'
	stockCode: string; // 6 digits
	periodCode: 'D' | 'W' | 'M';
	orgAdjPrc: string; // 0 반영 1 미반영
};

// 주식현재가 일자별 시세 조회
export const getPriceHistory = async (params: CurrentPriceParams) => {
	const { marketCode, stockCode, periodCode, orgAdjPrc } = params;
	const res: AxiosResponse<KisResponseType<GetPriceHistoryResponse>> = await stockApi({
		method: 'GET',
		url: '/uapi/domestic-stock/v1/quotations/inquire-daily-price',
		headers: {
			// 거래ID
			tr_id: 'FHKST01010100', // 주식현재가 시세
		},
		params: {
			FID_COND_MRKT_DIV_CODE: marketCode,
			FID_INPUT_ISCD: stockCode,
			FID_PERIOD_DIV_CODE: periodCode,
			FID_ORG_ADJ_PRC: orgAdjPrc,
		},
	});
	return res.data.output;
};
