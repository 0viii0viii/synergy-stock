import { Params } from '@/types/query.ts';

export type InquirePrice2Params = Params<{
	marketCode: string; // 시장코드
	stockCode: string; // 종목코드
	stockName: string; // 종목명
}>;

export type InquirePrice2Response = {
	rt_cd: string;
	msg_cd: string;
	msg1: string;
	output: {
		name: string; // custom resposne (종목명)
		rprs_mrkt_kor_name: string; // 대표 시장 한글 명
		new_hgpr_lwpr_cls_code: string; // 신 고가 저가 구분 코드
		mxpr_llam_cls_code: string; // 상하한가 구분 코드
		crdt_able_yn: string; // 신용 가능 여부
		stck_mxpr: string; // 주식 상한가
		elw_pblc_yn: string; // ELW 발행 여부
		prdy_clpr_vrss_oprc_rate: string; // 전일 종가 대비 시가2 비율
		crdt_rate: string; // 신용 비율
		marg_rate: string; // 증거금 비율
		lwpr_vrss_prpr: string; // 최저가 대비 현재가
		lwpr_vrss_prpr_sign: string; // 최저가 대비 현재가 부호
		prdy_clpr_vrss_lwpr_rate: string; // 전일 종가 대비 최저가 비율
		stck_lwpr: string; // 주식 최저가
		hgpr_vrss_prpr: string; // 최고가 대비 현재가
		hgpr_vrss_prpr_sign: string; // 최고가 대비 현재가 부호
		prdy_clpr_vrss_hgpr_rate: string; // 전일 종가 대비 최고가 비율
		stck_hgpr: string; // 주식 최고가
		oprc_vrss_prpr: string; // 시가2 대비 현재가
		oprc_vrss_prpr_sign: string; // 시가2 대비 현재가 부호
		mang_issu_yn: string; // 관리 종목 여부
		divi_app_cls_code: string; // 동시호가배분처리코드
		short_over_yn: string; // 단기과열여부
		mrkt_warn_cls_code: string; // 시장경고코드
		invt_caful_yn: string; // 투자유의여부
		stange_runup_yn: string; // 이상급등여부
		ssts_hot_yn: string; // 공매도과열 여부
		low_current_yn: string; // 저유동성 종목 여부
		vi_cls_code: string; // VI적용구분코드
		short_over_cls_code: string; // 단기과열구분코드
		stck_llam: string; // 주식 하한가
		new_lstn_cls_name: string; // 신규 상장 구분 명
		vlnt_deal_cls_name: string; // 임의 매매 구분 명
		flng_cls_name: string; // 락 구분 이름
		revl_issu_reas_name: string; // 재평가 종목 사유 명
		mrkt_warn_cls_name: string; // 시장 경고 구분 명
		stck_sdpr: string; // 주식 기준가
		bstp_cls_code: string; // 업종 구분 코드
		stck_prdy_clpr: string; // 주식 전일 종가
		insn_pbnt_yn: string; // 불성실 공시 여부
		fcam_mod_cls_name: string; // 액면가 변경 구분 명
		stck_prpr: string; // 주식 현재가
		prdy_vrss: string; // 전일 대비
		prdy_vrss_sign: string; // 전일 대비 부호
		prdy_ctrt: string; // 전일 대비율
		acml_tr_pbmn: string; // 누적 거래 대금
		acml_vol: string; // 누적 거래량
		prdy_vrss_vol_rate: string; // 전일 대비 거래량 비율
		bstp_kor_isnm: string; // 업종 한글 종목명
		sltr_yn: string; // 정리매매 여부
		trht_yn: string; // 거래정지 여부
		oprc_rang_cont_yn: string; // 시가 범위 연장 여부
		vlnt_fin_cls_code: string; // 임의 종료 구분 코드
		stck_oprc: string; // 주식 시가
		prdy_vol: string; // 전일 거래량
	};
};
