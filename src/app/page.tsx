import AnimeList from "@/components/animeList/AnimeList";
import BasicAnimeDisplayer from "@/components/basicAnimeDisplayer/BasicAnimeDisplayer";
import { backendUrl } from "@/db/util"
import { animeData } from "@/types/AnimeTypes";

async function getTopAiringAnime(){
	const result = await fetch(backendUrl + '/anime/gogoanime/top-airing')
	const anime = await result.json()
	return anime;
}

export default async function Home() {
	const serverData = await getTopAiringAnime();
	const topAiring = serverData.results as animeData[] 
	return (
		<main>
			<h2>Welcome to Pulse Anime</h2>
			<p>Watch Anime & Read Manga & Novel for Free</p>
			<p>PulseAnime provides users with various genres including Action, Comedy, Demons, Drama, Historical, Romance, Samurai, School, Shoujo Ai, Shounen Supernatural, etc. This is the perfect place to expand the imagination of children under 12 years old as well as spread beautiful images of friendship, family, teammates, magic, etc. PulseAnime  is committed to keeping you updated with the latest releases and providing excellent streaming capabilities for the best experience possible.</p>
			<form className="search-bar">
				<input type="search" placeholder="Search for the title here!" />
				<button type="submit">Search</button>
			</form>
			<AnimeList animes={topAiring}/>
			
		</main>
	)
}
