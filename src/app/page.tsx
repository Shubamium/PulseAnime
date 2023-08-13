import AnimeList from "@/components/animeList/AnimeList";
import BasicAnimeDisplayer from "@/components/basicAnimeDisplayer/BasicAnimeDisplayer";
import HomeTitle from "@/components/home/HomeTitle";
import { backendUrl } from "@/db/util";
import { AnimeData } from "@/types/AnimeTypes";
import Image from "next/image";
import styling from './home.module.scss';
async function getTopAiringAnime(){
	const result = await fetch(backendUrl + '/anime/gogoanime/top-airing');
	const anime = await result.json();
	return anime;
}

export default async function Home() {
	const serverData = await getTopAiringAnime();
	const topAiring = serverData.results as AnimeData[]; 
	return (
		<main className={styling['container_home-page']}>
			<HomeTitle/>
			<AnimeList animes={topAiring}/>
		</main>
	);
}



