import React, { ReactNode } from 'react';
import './mediaDetail.scss';

type Props = {
	title:string;
	text:string | ReactNode;
}

export default function MediaDetail({title,text}: Props) {
  return (
	<div className="detail">
		<div className="detail-name">
			<p>{title}</p>
		</div>
		<div className="detail-text panel">
			{typeof text === 'string' ? <p>{text}</p> : text}
		</div>
	</div>
  );
}