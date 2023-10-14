import React, { ReactNode } from 'react';
import './detailLayout.scss';

type DetailLayoutProps = {
	className?:string
	children:ReactNode
}


export default function DetailLayout({children,className}: DetailLayoutProps) {
	return (
		<div className={'container_detail-layout '+className}>
			{children}
		</div>
	);
}