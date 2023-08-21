import AnimeList from "@/components/animeList/AnimeList";
import HomeTitle from "@/components/home/homeTitle/HomeTitle";
import { backendUrl } from "@/db/util";
import { AnimeSearchResult } from "@/types/AnimeTypes";
import styling from './home.module.scss';


async function getTopAiringAnime(){
	const result = await fetch(backendUrl + '/anime/gogoanime/top-airing');
	const anime = await result.json();
	return anime;
}

export default async function Home() {
	const serverData = await getTopAiringAnime();
	const topAiring = serverData.results as AnimeSearchResult[]; 
	return (
		<main className={styling['container_home-page']}>
			<HomeTitle/>
			{/* <AnimeList animes={topAiring}/> */}
		</main>
	);
}



