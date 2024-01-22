import React from 'react';
import './novelSearch.scss';
import { searchNovel } from '@/db/NovelData';
import { redirect } from 'next/navigation';
import { FaBookOpen } from 'react-icons/fa';
import Link from 'next/link';

type Props = {
	searchParams:{
		query:string
	}
}

export default async function NovelSearch({searchParams}: Props) {
	const searchResults = await searchNovel(searchParams.query);
	if(!searchResults) redirect('/');
	
	return (
		<div id='container_novel-search' >
			<div className="header">
				 <span className='category'><FaBookOpen/> Novel</span> - Searching for {'"'}<b>{searchParams.query}</b>{'"'} 
			</div>

			<div className="novel-list">

				{searchResults.results && searchResults.results.length > 0 && 
					searchResults.results.map((result)=>
					{
						return <NovelSearchResultDisplayer key={result.id} id={result.id} image={result.image} title={result.title}/>;
					})}
			</div>
			
		</div>
	);
}

type NovelSearchResultDisplayerProps = {
 image:string;
 title:string;
 id:string;
}
function NovelSearchResultDisplayer({image,title,id} : NovelSearchResultDisplayerProps){
	return 	<Link type='div' href={`/novel/details/${id}`} className="novel">
		<img src={image} alt="" />
		<div className="details">
			<h2 className='title'>{title ?? 'No title'}</h2>
		</div>
	</Link>;
}