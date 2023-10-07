'use client';
import Button from '@/components/general/button/Button';
import Dropdown from '@/components/general/dropdown/Dropdown';
import { AnimeEpisode } from '@/types/AnimeTypes';
import React, { Provider, useContext } from 'react';
import { FaDownload, FaExpand, FaStar } from 'react-icons/fa';
import EpisodeControls from '../episodeControls/EpisodeControls';
import { AnimeProvider } from '@/types/AnimeEnums';
import AnimeWatchProvider, { AnimeWatchContext, AnimeWatchContextAction } from '../AnimeWatchProvider';
import { useRouter } from 'next/navigation';

type mediaActionProps = {
	episodeList:AnimeEpisode[],
	animeId:string,
	currentEpisode:number;
	provider:AnimeProvider;
}

const MediaAction = ({episodeList,animeId,currentEpisode,provider}: mediaActionProps) => {
	const allProvider = Object.keys(AnimeProvider);
	let defaultValue = 0;
	const serverOptions = allProvider.map((keys,index)=>{
		if(AnimeProvider[keys] === provider) defaultValue = index;
		return {
			label:AnimeProvider[keys],
			value:keys
		};
	});

	
	const navigate = useRouter();
	const handleChangeProvider = (value:string)=>{
		const currentUrl = new URL(window.location.href);
		currentUrl.searchParams.set('provider',value);
		console.log(currentUrl.toString());
		navigate.push(currentUrl.toString());
	};
	return (
		<div className="media-action">
				 <EpisodeControls
				 	route={"/anime/watch/"+animeId} 
				 	currentEpisode={currentEpisode} 
					episodesData={episodeList}
					provider={provider}
				/>
				<Dropdown options={serverOptions} onChange={handleChangeProvider} defaultValue={serverOptions[defaultValue].value}/>
				<Button className="btn-download">Download<FaDownload/></Button>
				<Button className="btn-star"><FaStar/></Button>
				<Button className="btn-fullscreen"><FaExpand/></Button>
		</div>
	);
};

export default MediaAction;