'use client';
import React, { useContext, useEffect, useState } from 'react';

import { AnimeEpisode, AnimeEpisodeSource } from '@/types/AnimeTypes';
import { AnimeProvider } from '@/types/AnimeEnums';
import { getAnimeEpisodeUrl } from '@/db/AnimeData';
import VideoPlayer from '@/components/videoPlayer/VideoPlayer';

type AnimeVideoProps = {
	episode:number;
	provider:AnimeProvider;
	episodeList:AnimeEpisode[];
}

export default function AnimeVideo({episode,provider,episodeList}: AnimeVideoProps) {


	const [videoInfo,setVideoInfo] = useState<AnimeEpisodeSource[]>();

	useEffect(()=>{
		const abortController = new AbortController();
		const episodeId = episodeList.findIndex((episodeData) => episodeData.number == episode);
		if(episodeId === -1) return;
		console.log(episodeList[episodeId].id);

		const loadAnime = async() => {
			const url = new URL(getAnimeEpisodeUrl(episodeList[episodeId].id,provider));
			try{
				const req = await fetch(url,{signal:abortController.signal});
				const response = await req.json();
				
				if(req.ok){
					setVideoInfo(response.sources);
				}else{
					console.log('video is missing');
				}
			}catch (error: unknown) { // Specify the error type as "unknown"
				if (error instanceof Error) { // Check if it's an instance of the Error class
					if (error.name === 'AbortError') {
					console.log('Fetch request was aborted');
					} else {
					console.error('An error occurred:', error);
					}
				}
				}
		}; 

		loadAnime();

		return ()=>{
			console.log('cleaning up');
			abortController.abort();
		};
			
	},[episode,episodeList,provider]);

	useEffect(()=>{
	
	},[videoInfo]);
	return (
		
		<div className="video">
				{videoInfo ? (
					<VideoPlayer videoInfo={videoInfo}/>
				) : (
					<p>Waiting for video sources to load / Invalid video sources</p>
				)}
		</div>
	);
}