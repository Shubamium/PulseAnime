'use client';
import Button from "@/components/general/button/Button";
import { AnimeEpisode } from "@/types/AnimeTypes";
import Link from "next/link";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import './episodeControls.scss';
import { useEffect, useState } from "react";
import { AnimeProvider } from "@/types/AnimeEnums";

type Props = {
	currentEpisode:number;
	episodesData:AnimeEpisode[];
	route:string;
	provider:AnimeProvider;
}
export default function EpisodeControls({route,currentEpisode,episodesData,provider}: Props) {
	const [prevLink,setPrevLink] = useState('prev');
	const [nextLink,setNextLink] = useState('prev');
	const [episodeId,setEpisodeId] = useState<number | null>(null);
	
	// const currentEpisodeId = episodesData.findIndex((episode) => episode.number == currentEpisode);
	
	useEffect(()=>{
		const currentEpisodeId = episodesData.findIndex((episode) => episode.number == currentEpisode);
		setEpisodeId(currentEpisodeId);
		console.log(currentEpisodeId);
	},[episodesData,currentEpisode]);

	useEffect(()=>{
		if(episodeId !== -1 && episodesData && episodeId !== null){
			const url = new URL(window.location.href);
			url.searchParams.set('episode',episodesData[Math.max(episodeId - 1,0)]?.number.toString());
			const prevLink = url.pathname + url.search + url.hash;
			setPrevLink(prevLink);
			url.searchParams.set('episode',episodesData[Math.min(episodeId + 1,episodesData.length-1)]?.number.toString());
			const nextLink = url.pathname + url.search + url.hash;
			setNextLink(nextLink);
		}
		console.log(currentEpisode);
	},[provider,episodeId]);


	if(episodesData?.length <= 1 || episodeId === null || episodeId === -1) return null;
	
	// const url = new URL(window.location.href);
	// url.searchParams.set('episode',episodesData[Math.max(currentEpisodeId - 1,0)]?.number.toString());
	// const prevLink = url.pathname + url.search + url.hash;
	// url.searchParams.set('episode',episodesData[Math.min(currentEpisodeId + 1,episodesData.length-1)]?.number.toString());
	// const nextLink = url.pathname + url.search + url.hash;
	
	return (
		<div className="episode-control">
			<Link href={prevLink}><Button className="btn-prev"><MdSkipPrevious/>Prev</Button></Link>
			<Link href={nextLink}><Button className="btn-next">Next<MdSkipNext/></Button></Link>
		</div>
	);
}