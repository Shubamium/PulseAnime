'use client';
import { AnimeEpisode } from "@/types/AnimeTypes";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaEyeSlash, FaPlayCircle } from "react-icons/fa";
import './episodeList.scss';
import Button from "@/components/general/button/Button";
import { useEffect, useRef, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import Dropdown from "@/components/general/dropdown/Dropdown";
import { AnimeProvider } from "@/types/AnimeEnums";

type Props = {
	episodes:AnimeEpisode[];
	animeId:string;
	currentEpisode:number;
	provider:AnimeProvider;
}

const EPISODE_DETAIL_VIEW = 'episode_toggle';

export default function EpisodeList({episodes,currentEpisode,animeId,provider}: Props) {
	let savedDetailed = undefined;
	if(typeof window === 'undefined'){
		 savedDetailed = JSON.parse(localStorage.getItem(EPISODE_DETAIL_VIEW)|| 'true');
	}
	const [detailedEpisode,setDetailedEpisode] = useState(savedDetailed ?? true);
	const episodeContainerRef = useRef<HTMLDivElement>(null);
	const [isLongAnime,setIsLongAnime] = useState(false);
	const [episodeSectionIndex,setEpisodeSectionIndex] = useState<number>(0);
	const [episodeElement,setEpisodeElement] = useState<JSX.Element[][]>([]);
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

	const getDropdownOptions = (episodeList:JSX.Element[][])=>{
		const options = episodeList.map((epList,index:number)=>{
			const startingEp = index === 0 ? 1 : index*100 + 1;
			const endingEp = epList.length < 100 ? startingEp + epList.length-1 : (index + 1) * 100; 
			return {
				value:index.toString(),
				label:`${startingEp} - ${endingEp}`
			};
		});
		return options;
	};

	useEffect(()=>{
		if(episodes){
			const allEpisodes = episodes.map((episode,index:number)=>{
				const isPlayed = currentEpisode == (episode.number ?? index + 1);
				const isDetailed = ()=>detailedEpisode;
				return (
					<Link href={`/anime/watch/${animeId}?episode=${episode.number}&provider=${provider.toUpperCase()}`} id={episode.id} className={"episode" + ` ${isPlayed ? 'played' : 'not-played' }`} key={'episode-list-'+index}>
						{episode.image && (
							<div className={"episode-detail"+ ` ${detailedEpisode ?'visible':'hidden'}`}>
									{episode.image && <Image loading="lazy" src={episode.image} className="episode-image" alt="episode-thumbnail" width={190} height={100}></Image>}
									<p className="title">{episode.title}</p>
							</div>
						)}
						<div className="info">
							<h2>Episode {episode.number ?? index+1}</h2>
							{isPlayed && <p className="play-status"><FaPlayCircle/></p>}
						</div>
					</Link>
				);
			});
			let sectionedEpisode:JSX.Element[][] = [[...allEpisodes]];
			if(allEpisodes.length > 100){
				sectionedEpisode = [] as JSX.Element[][];
				for(let i = 0; i < allEpisodes.length; i += 100){
					sectionedEpisode.push(allEpisodes.slice(i,i+100));
				}
				setIsLongAnime(true);
			}else{
				setIsLongAnime(false);
			}
			setEpisodeElement(sectionedEpisode);
		}
	},[episodes,detailedEpisode,provider]);
	
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

			{isLongAnime && (
				<div className="episode-section-control">
					<Dropdown options={getDropdownOptions(episodeElement)} onChange={(res)=>{setEpisodeSectionIndex(prev=>parseInt(res)); console.log(parseInt(res));}}/>
				</div>
			)}

			<div className="episode-list" ref={episodeContainerRef}>
				{episodeElement[episodeSectionIndex]?.length !== 0 ? episodeElement[episodeSectionIndex] : (
					<p>No episodes found, Try another server!</p>
				)}
			</div>
		</div>
	);
}