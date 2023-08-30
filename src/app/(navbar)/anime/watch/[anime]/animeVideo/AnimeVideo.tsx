'use client';
import React, { useContext, useEffect, useState } from 'react';
import { AnimeWatchContext } from '../AnimeWatchProvider';
import { AnimeEpisodeSources } from '@/types/AnimeTypes';
import { AnimeProvider } from '@/types/AnimeEnums';

type AnimeVideoProps = {
	episode:number;
}

export default function AnimeVideo({episode}: AnimeVideoProps) {

	const animeWatchContext = useContext(AnimeWatchContext);
	const [episodeInfo,setEpisodeInfo] = useState({episode,provider:animeWatchContext?.state.activeProvider || AnimeProvider.GOGOANIME});
	const [videoInfo,setVideoInfo] = useState<AnimeEpisodeSources>();

	useEffect(()=>{
		async function loadAnime(){
			console.log('loading video info for this episode:',episodeInfo);
			// const url =  
			// const response = await fetch()
		} 
		loadAnime();
	},[episodeInfo]);

	useEffect(()=>{
		setEpisodeInfo((prev) => { 
			return {...prev,episode};
		});
	},[episode]);

	useEffect(()=>{
		if(animeWatchContext){
			setEpisodeInfo((prev)=>{
				return {...prev,provider:animeWatchContext.state.activeProvider};
			});
		}
	},[animeWatchContext]);

	return (
		
		<div className="video">
			{animeWatchContext?.state.activeProvider}
			{/* {episodeData && episodeVideo.sources[0] && episodeVideo.sources[3].isM3U8 &&
				(
					<VideoPlayer url={episodeVideo.sources[3].url}/>
				)
			} */}
		</div>
	);
}