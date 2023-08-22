'use client';
import { AnimeEpisode } from "@/types/AnimeTypes";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaEyeSlash, FaPlayCircle } from "react-icons/fa";
import './episodeList.scss';
import Button from "@/components/general/button/Button";
import { useRef, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

type Props = {
	episodes:AnimeEpisode[];
	animeId:string;
	currentEpisode:number;
}

const EPISODE_DETAIL_VIEW = 'episode_toggle';

export default function EpisodeList({episodes,currentEpisode,animeId}: Props) {
	const [detailedEpisode,setDetailedEpisode] = useState(JSON.parse(localStorage.getItem(EPISODE_DETAIL_VIEW)|| 'true') ?? true);
	const episodeContainerRef = useRef<HTMLDivElement>(null);
	const changeDetailedView = ()=>{
		setDetailedEpisode((prev:boolean) => {
			localStorage.setItem(EPISODE_DETAIL_VIEW,JSON.stringify(!prev));
			return !prev;
		});
	};

	const scrollView = (amount:number)=>{
		
		if(episodeContainerRef.current){
			const currentScrollTop = episodeContainerRef.current.scrollTop;
			episodeContainerRef.current.scrollBy({behavior:'smooth',top:amount});
			console.log(currentScrollTop);
		}
	};
	return (
		<div className="container_episodes-list">
			<div className="episode-header">
				<div className="title">
					<h2>Episodes</h2>
				</div>
				<div className="action">
					<Button className="btn-toggle-detail" onClick={changeDetailedView}>{detailedEpisode ? (<FaEye/>):(<FaEyeSlash/>)}</Button>
					<Button className="btn-scroll" onClick={()=>{scrollView(-4300);}}><BsChevronUp/></Button>
					<Button className="btn-scroll" onClick={()=>{scrollView(4300);}}><BsChevronDown/></Button>
				</div>
			</div>
			<div className="episode-list" ref={episodeContainerRef}>
				{episodes.map((episode,index:number)=>{
					const isPlayed = currentEpisode ==  (episode.number ?? index + 1);
					return (
						<Link href={`/anime/watch/${animeId}?episode=${episode.number}`} className={"episode" + ` ${isPlayed ? 'played' : 'not-played' }`} key={'episode-list-'+index}>
							{episode.image && detailedEpisode && (
								<div className="episode-detail">
										{episode.image && <Image src={episode.image} className="episode-image" alt="episode-thumbnail" width={190} height={100}></Image>}
										<p className="title">{episode.title}</p>
								</div>
							)}
							<div className="info">
								<h2>Episode {episode.number ?? index+1}</h2>
								{isPlayed && <p className="play-status"><FaPlayCircle/></p>}
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
}