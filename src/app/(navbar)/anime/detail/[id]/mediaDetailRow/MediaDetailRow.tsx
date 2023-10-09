import React from 'react';
import './mediaDetailRow.scss';

type Props = {
	title:string | React.ReactNode,
	children:React.ReactNode;
}

export default function MediaDetailRow({children,title}: Props) {
	return (
		<div className="media-info-part">
			<div className="info-part-header">
				<h2>{title}</h2>
			</div>
			<div className="media-info-content">
				{children}
			</div>
		</div>
	);
}