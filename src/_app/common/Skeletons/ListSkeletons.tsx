import { Skeleton } from '@mantine/core';
import React from 'react';

interface Props {
	skeletonsCount: number;
	isShow: boolean;
	isHasData: number;
	height?: number;
}
const ListSkeletons: React.FC<Props> = ({
	skeletonsCount,
	isShow,
	height,
	isHasData,
}) => {
	if (!isShow && isHasData) {
		return null;
	}

	return (
		<div>
			{!isShow && !isHasData ? null : (
				<>
					{new Array(skeletonsCount).fill(skeletonsCount).map((_, idx) => (
						<Skeleton key={idx} h={height ?? 120} radius={5} my={5} />
					))}
				</>
			)}
		</div>
	);
};

export default ListSkeletons;
