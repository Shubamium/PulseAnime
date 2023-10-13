import Image from 'next/image';
import React from 'react';
import './mangaSearchResult.scss';
import Link from 'next/link';
import Button from '@/components/general/button/Button';

type MangaSearchResultProps = {
	title:string;
	cover:string;
	to?:string;
	type?:string;
	tags?:string[];
	volume?:number;
	chapter?:number;
}

export default function MangaSearchResult({title,cover,to,type,tags,volume,chapter}: MangaSearchResultProps) {
	return (
		<Link href ={to || '/'} className="container_manga-list">
			<div className="img-part">
				<Image className='cover' src={cover} width={300} height={400} alt=''/>
			</div>
			<div className="manga-detail">
				<h2 className='type'>{type?.replaceAll('_', ' ')}</h2>
				<h2 className='title'>{title || 'Title'}</h2>
				{ (volume || chapter) && 
					<div className="manga-count">
						{volume && <p className='count'>Volumes: {volume}</p>}
						{chapter && <p className='count'>Chapter: {chapter}</p>}
					</div>
				}

				<div className="manga-tags">
					{tags?.map((tag)=>{
						return <p className='manga-tag' key={'manga-tag-'+tag}>
							 {tag}
						</p>;
					})}
				</div>
			
			</div>
		</Link>
	);
}