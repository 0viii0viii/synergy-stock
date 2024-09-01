export type KisResponseType<Output> = {
	rt_cd: string; // 0: 성공, 이외의 값: 실패
	msg_cd: string; // 응답코드
	msg1: string; // 응답메시지
	output: Output[]; // 응답상세
};
