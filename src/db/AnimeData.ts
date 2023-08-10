import { AnimeData, AnimeDetail, AnimeEpisodeData, AnimeSearchResults } from "@/types/AnimeTypes";
import { backendUrl } from "./util";

export async function getAnimeSearch(query:string) {

	const result = await fetch(backendUrl + '/anime/gogoanime/' + encodeURIComponent(query));
	const res = await result.json();

	return res as AnimeSearchResults;
}

export async function getAnimeDetail(id:string) {

	const response = await fetch(backendUrl +'/anime/gogoanime/info/'+encodeURIComponent(id));
	const result = await response.json();

	return result as AnimeDetail;

}

export async function getAnimeEpisode(episodeId:string) {
	console.log('getting anime episode');
	const response = await fetch(backendUrl +'/anime/gogoanime/watch/'+encodeURIComponent(episodeId));
	const result = await response.json();

	return result as AnimeEpisodeData;

}
