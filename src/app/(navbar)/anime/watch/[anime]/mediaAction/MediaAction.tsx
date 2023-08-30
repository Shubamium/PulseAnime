'use client';
import Button from '@/components/general/button/Button';
import Dropdown from '@/components/general/dropdown/Dropdown';
import { AnimeEpisode } from '@/types/AnimeTypes';
import React, { useContext } from 'react';
import { FaDownload, FaExpand, FaStar } from 'react-icons/fa';
import EpisodeControls from '../episodeControls/EpisodeControls';
import { AnimeProvider } from '@/types/AnimeEnums';
import AnimeWatchProvider, { AnimeWatchContext, AnimeWatchContextAction } from '../AnimeWatchProvider';

type mediaActionProps = {
	episodeList:AnimeEpisode[],
	animeId:string,
	currentEpisode:number;
}

const MediaAction = ({episodeList,animeId,currentEpisode}: mediaActionProps) => {
	const serverOptions = Object.keys(AnimeProvider).map((keys)=>{
		return {
			label:AnimeProvider[keys],
			value:keys
		};
	});
	const animeWatchContext = useContext(AnimeWatchContext);
	const handleChangeProvider = (value:string)=>{
		animeWatchContext?.dispatch({type:AnimeWatchContextAction.SET_PROVIDER,payload:AnimeProvider[value]});
	};
	return (
		<div className="media-action">
				<Dropdown options={serverOptions} onChange={handleChangeProvider}/>
				 <EpisodeControls
				 	route={"/anime/watch/"+animeId} 
				 	currentEpisode={currentEpisode} 
					episodesData={episodeList}
				/>
				<Button className="btn-download">Download<FaDownload/></Button>
				<Button className="btn-star"><FaStar/></Button>
				<Button className="btn-fullscreen"><FaExpand/></Button>
		</div>
	);
};

export default MediaAction;