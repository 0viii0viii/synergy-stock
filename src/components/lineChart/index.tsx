import { Flex, Text } from '@chakra-ui/react';
import { isEmpty } from 'lodash-es';
import { useCallback } from 'react';
import {
	CartesianGrid,
	Line,
	LineChart as LineChartComponent,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { BaseAxisProps } from 'recharts/types/util/types';

type LineChartProps = {
	width: number | string;
	height: number | string;
	data: any;
	margin?: { top?: number; left?: number; right?: number; bottom?: number };
	xTickFormatter?: BaseAxisProps['tickFormatter'];
	xDataKey: string;
	lineDataKey: string;
};

export const LineChart = ({ width, height, data, margin, xDataKey, lineDataKey, xTickFormatter }: LineChartProps) => {
	const CustomizedTooltip = useCallback((props: any) => {
		if (isEmpty(props.payload)) return null;

		const content = props.payload[0];
		return (
			<Flex
				direction="column"
				bg="#fff"
				p={2}
				boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
				borderRadius={5}
				border="1px solid #EBEEF3"
				textAlign="center"
			>
				<Text fontSize={12}>{xTickFormatter?.(content.payload[xDataKey], 0)}</Text>
				<Text fontWeight={500}>{content.value.toLocaleString()}원</Text>
			</Flex>
		);
	}, []);

	return (
		<ResponsiveContainer width={width} height={height}>
			<LineChartComponent data={data} margin={margin}>
				<CartesianGrid vertical={false} stroke="#EBEEF3" />
				<XAxis dataKey={xDataKey} tickFormatter={xTickFormatter} fontSize={12} />
				<YAxis fontSize={12} tickFormatter={(value) => value.toLocaleString()} />
				<Tooltip isAnimationActive={false} content={<CustomizedTooltip />} />
				<Line type="monotone" dataKey={lineDataKey} dot={false} stroke="#8850F1" />
			</LineChartComponent>
		</ResponsiveContainer>
	);
};
