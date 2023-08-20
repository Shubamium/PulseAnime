import React from 'react';
import './mediaDetail.scss';

type Props = {
	title:string;
	text:string;
}

export default function MediaDetail({title,text}: Props) {
  return (
	<div className="detail">
		<div className="detail-name">
			<p>{title}</p>
		</div>
		<div className="detail-text panel">
			<p>{text}</p>
		</div>
	</div>
  );
}