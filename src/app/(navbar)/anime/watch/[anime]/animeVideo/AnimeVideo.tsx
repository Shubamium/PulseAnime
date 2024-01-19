'use client';
import React, { useContext, useEffect, useState } from 'react';

import { AnimeEpisode, AnimeEpisodeSource } from '@/types/AnimeTypes';
import { AnimeProvider } from '@/types/AnimeEnums';
import { getAnimeEpisodeUrl } from '@/db/AnimeData';
import VideoPlayer from '@/components/videoPlayer/VideoPlayer';
import { FaSpinner } from 'react-icons/fa';

type AnimeVideoProps = {
	episode:number;
	provider:AnimeProvider;
	episodeList:AnimeEpisode[];
}

export default function AnimeVideo({episode,provider,episodeList}: AnimeVideoProps) {


	const [videoInfo,setVideoInfo] = useState<AnimeEpisodeSource[]>();
	const [loadFail,setLoadFail] = useState(false);

	useEffect(()=>{
		const abortController = new AbortController();
		const episodeId = episodeList.findIndex((episodeData) => episodeData.number == episode);
		if(episodeId === -1) return;
		console.log(episodeList[episodeId].id);

		const loadAnime = async() => {
			const url = `/api/anime/episode?provider=${provider}&id=${episodeList[episodeId].id}`;
		
			try{
				const req = await fetch(url,{signal:abortController.signal});
				const response = await req.json();
				if(req.ok){
					const data = JSON.parse(response);
					setVideoInfo(data.sources);
				}else{
					console.log('video is missing');
					setLoadFail(true);
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
		if(loadFail){
			setLoadFail(false);
		}
	},[episode]);
	return (
		
		<div className={`video ${videoInfo ? 'loaded' : ''}`}>
				<div className="spinner">
					<FaSpinner/>
				</div>
				{videoInfo ? (
					<VideoPlayer videoInfo={videoInfo}/>
				) : 		
					loadFail ? <p>Waiting for video sources to load / Invalid video sources</p>
					: <></>
				}
		</div>
	);
}