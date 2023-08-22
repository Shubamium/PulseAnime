'use client';
import Button from "@/components/general/button/Button";
import { AnimeEpisode } from "@/types/AnimeTypes";
import Link from "next/link";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import './episodeControls.scss';

type Props = {
	currentEpisode:number;
	episodesData:AnimeEpisode[];
	route:string;
}
export default function EpisodeControls({route,currentEpisode,episodesData}: Props) {
	if(episodesData.length <= 1 ) return null;
	const currentEpisodeId = episodesData.findIndex((episode) => episode.number == currentEpisode);
	if(currentEpisodeId === -1) return null;
	return (
		<div className="episode-control">
			<Link href={route+`episode=${episodesData[Math.max(currentEpisodeId-1,0)].number}`}><Button className="btn-prev"><MdSkipPrevious/>Prev</Button></Link>
			<Link href={route+`?episode=${episodesData[Math.min(currentEpisodeId+1,episodesData.length)].number}`}><Button className="btn-next">Next<MdSkipNext/></Button></Link>
		</div>
	);
}