import { KisResponseType2 } from '@/types/kis.ts';

export type Params = {
	marketCode: 'J'; // 마켓 코드 주식 = J
	stockCode: string; // 종목 코드
	periodCode: 'D' | 'W' | 'M' | 'Y'; // 기간 코드 일 = D 주 = W 월 = M 년 = Y
	orgAdjPrc: '0' | '1'; // 조정가격 반영여부 0 = 반영 1 = 미반영
	startDate: string; // 조회 시작일 20220501
	endDate: string; // 조회 종료일 20220531
};

export type PriceHistoryByPeriodParams = Pick<
	Params,
	'marketCode' | 'periodCode' | 'stockCode' | 'orgAdjPrc' | 'startDate' | 'endDate'
>;

type Output1 = {
	prdy_vrss: string; // 전일 대비
	prdy_vrss_sign: string; // 전일 대비 부호
	prdy_ctrt: string; // 전일 대비율
	stck_prdy_clpr: string; // 주식 전일 종가
	acml_vol: string; // 누적 거래량
	acml_tr_pbmn: string; // 누적 거래 대금
	hts_kor_isnm: string; // HTS 한글 종목명
	stck_prpr: string; // 주식 현재가
	stck_shrn_iscd: string; // 주식 단축 종목코드
	prdy_vol: string; // 전일 거래량
	stck_mxpr: string; // 상한가
	stck_llam: string; // 하한가
	stck_oprc: string; // 시가
	stck_hgpr: string; // 최고가
	stck_lwpr: string; // 최저가
	stck_prdy_oprc: string; // 주식 전일 시가
	stck_prdy_hgpr: string; // 주식 전일 최고가
	stck_prdy_lwpr: string; // 주식 전일 최저가
	askp: string; // 매도호가
	bidp: string; // 매수호가
	prdy_vrss_vol: string; // 전일 대비 거래량
	vol_tnrt: string; // 거래량 회전율
	stck_fcam: string; // 주식 액면가
	lstn_stcn: string; // 상장 주수
	cpfn: string; // 자본금
	hts_avls: string; // 시가총액
	per: string; // PER
	eps: string; // EPS
	pbr: string; // PBR
	itewhol_loan_rmnd_ratem_name: string; // 전체 융자 잔고 비율
};

type Output2 = {
	stck_bsop_date: string; // 주식 영업 일자
	stck_clpr: string; // 주식 종가
	stck_oprc: string; // 주식 시가
	stck_hgpr: string; // 주식 최고가
	stck_lwpr: string; // 주식 최저가
	acml_vol: string; // 누적 거래량
	acml_tr_pbmn: string; // 누적 거래 대금
	flng_cls_code: string; // 락 구분 코드
	prtt_rate: string; // 분할 비율
	mod_yn: string; // 분할변경여부
	prdy_vrss_sign: string; // 전일 대비 부호
	prdy_vrss: string; // 전일 대비
	revl_issu_reas: string; // 재평가사유코드
};

export type PriceHistoryByPeriodResponse = KisResponseType2<Output1, Output2>;
