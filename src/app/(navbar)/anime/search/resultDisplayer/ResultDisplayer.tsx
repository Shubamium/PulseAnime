import Image from 'next/image';
import React from 'react';
import './resultDisplayer.scss';
import Link from 'next/link';
type ResultDisplayerProps = {
	title?:string;
	cover:string;
	to?:string;
}

export default function ResultDisplayer({title,cover,to}: ResultDisplayerProps) {
	return (
		<Link href={to || '/'} className="container_search-list">
			<Image className='cover' src={cover} width={300} height={400} alt=''/>
			<h2 className='title'>{title || 'Title'}</h2>
		</Link>
	);
}