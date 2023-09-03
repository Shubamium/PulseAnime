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
	const serverOptions = Object.keys(AnimeProvider).map((keys)=>{
		return {
			label:AnimeProvider[keys],
			value:keys
		};
	});
	const animeWatchContext = useContext(AnimeWatchContext);
	const navigate = useRouter();
	const handleChangeProvider = (value:string)=>{
		// animeWatchContext?.dispatch({type:AnimeWatchContextAction.SET_PROVIDER,payload:AnimeProvider[value]});
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
				<Dropdown options={serverOptions} onChange={handleChangeProvider}/>
				<Button className="btn-download">Download<FaDownload/></Button>
				<Button className="btn-star"><FaStar/></Button>
				<Button className="btn-fullscreen"><FaExpand/></Button>
		</div>
	);
};

export default MediaAction;