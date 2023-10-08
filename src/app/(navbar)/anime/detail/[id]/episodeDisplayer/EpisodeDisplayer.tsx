'use client';
import './episodeDisplayer.scss';
import Button from '@/components/general/button/Button';
import Dropdown from '@/components/general/dropdown/Dropdown';
import { AnimeProvider } from '@/types/AnimeEnums';
import { AnimeEpisode } from '@/types/AnimeTypes';
import Link from 'next/link';
import React, { ReactNode, useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaDownload, FaList } from 'react-icons/fa';

type EpisodeDisplayerProps = {
	episodes:AnimeEpisode[] | null
	animeId:string
}

export default function EpisodeDisplayer({episodes,animeId}: EpisodeDisplayerProps) {

	const [provider,setProvider] =  useState(AnimeProvider.NINEANIME);
	const [page,setPage] = useState(0);
	const [pageSelector,setPageSelector] = useState(0);
	const pageSize = 12;
	const pageSelectorSize = 5;
	
	if( episodes && episodes.length !== 0)  {
		
		let pageButtons:ReactNode[] = []; 
		let episodesPerPage:AnimeEpisode[][] = [];
		let episodesList = [...episodes];
		for(let i = 0; i < Math.ceil(episodes.length / pageSize); i++){
			pageButtons.push(
				<Button className={`btn-page ${ page === i ? 'active':''}`} onClick={()=>{setPage(i);}}>{i+1}</Button>
			);

			episodesPerPage.push(episodesList.splice(0,pageSize));
		}

		const maxPageSelector = Math.ceil(episodesPerPage.length / pageSelectorSize) - 1;
		const increasePageSelector = ()=>{
			setPageSelector(Math.min(pageSelector+1,maxPageSelector));
		};
		pageButtons = pageButtons.slice(pageSelectorSize * pageSelector,(pageSelectorSize * pageSelector)+pageSelectorSize);
		return(
			<div className="detail_episodes-displayer">
				<div className="header">
					<div className="left">
						<FaList className="icon"/>
						<h2> Episodes</h2>
					</div>
					<div className="right">
						<Dropdown options={[{label:'9Anime',value:AnimeProvider.NINEANIME},{label:'Gogoanime',value:AnimeProvider.GOGOANIME}]} onChange={(val)=>setProvider(val as AnimeProvider)}/>
					</div>
				</div>
				{episodesPerPage.length > 1 && (
					<div className="pagination">
						{episodesPerPage.length > pageSelectorSize &&  <Button className='btn-page edge' onClick={()=>{setPageSelector(Math.max(pageSelector-1,0));}}><FaArrowLeft/></Button>}
						{pageButtons}
						{pageButtons.length >= pageSelectorSize && pageSelector !== maxPageSelector && <Button className='btn-page' onClick={increasePageSelector}>...</Button>}
						{episodesPerPage.length > pageSelectorSize && <Button className='btn-page edge' onClick={increasePageSelector}><FaArrowRight/></Button>}
					</div>
				)}
				<div className="list">
					{episodesPerPage[page]?.map((episode)=>{
						return (
							<div className="episode panel" key={'episode-list-'+ episode.id}>
								<div className="episode-header">
									<h2 className=''>Episode {episode.number}</h2>
								</div>
								<div className="episode-body">
									<Button className='btn-download'>Download <FaDownload/></Button>
									<Button className='btn-watch'><Link href={'/anime/watch/'+ animeId +`?episode=${episode.number}&provider=${provider.toUpperCase()}`}>Watch <FaArrowRight/></Link></Button>
								</div>
							</div>
						);
					})}
				</div>
			
			</div>
		);
	}
	else{
		return (
			<div className="detail_episodes-not-found">
				<h2>The media has not yet been aired.</h2>
			</div>
		);
	} 
}