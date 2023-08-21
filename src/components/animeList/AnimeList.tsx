import { AnimeSearchResult } from "@/types/AnimeTypes";
import BasicAnimeDisplayer from "../basicAnimeDisplayer/BasicAnimeDisplayer";
import './animeList.scss';

type Props = {
	animes:AnimeSearchResult[]
}

export default function AnimeList({animes}:Props){
	return (
		<div className="anime-list" >
			{animes && animes.map((anime)=>{
				return(
					<BasicAnimeDisplayer key={anime.id} anime={anime}/>
				);
			})}
		</div>
	);
}