'use client';

import Button from '@/components/general/button/Button';
import Dropdown from '@/components/general/dropdown/Dropdown';
import { AnimeProvider } from '@/types/AnimeEnums';
import { AnimeEpisode } from '@/types/AnimeTypes';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaArrowRight, FaDownload, FaList } from 'react-icons/fa';

type EpisodeDisplayerProps = {
	episodes:AnimeEpisode[] | null
	animeId:string
}

export default function EpisodeDisplayer({episodes,animeId}: EpisodeDisplayerProps) {

	const [provider,setProvider] =  useState(AnimeProvider.NINEANIME);
	
	return episodes && episodes.length !== 0 ? (
		<div className="episodes">
			<div className="header">
					<div className="left">
						<FaList className="icon"/>
						<h2>  Episodes</h2>
					</div>
					<div className="right">
						<Dropdown options={[{label:'9Anime',value:AnimeProvider.NINEANIME},{label:'Gogoanime',value:AnimeProvider.GOGOANIME}]} onChange={(val)=>setProvider(val as AnimeProvider)}/>
					</div>
			</div>
			<div className="list">
				{episodes?.map((episode)=>{
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
	) : (
		<div className="episodes-not-found">
			<h2>The media has not yet been aired.</h2>
		</div>
	);
}