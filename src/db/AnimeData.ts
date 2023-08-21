import {  AnimeEpisodeData, AnimeMeta, AnimeSearchResults } from "@/types/AnimeTypes";
import { backendUrl } from "./util";

export async function getAnimeSearch(query:string) {

	const result = await fetch(backendUrl + '/meta/anilist/' + encodeURIComponent(query));
	const res = await result.json();

	return res as AnimeSearchResults;
}

// export async function getAnimeDetail(id:string) {

// 	const response = await fetch(backendUrl +'/anime/gogoanime/info/'+id);
// 	const result = await response.json();

// 	return result as AnimeDetail;

// }
export async function getAnimeMeta(id:string) {

	const response = await fetch(backendUrl +'/meta/anilist/info/'+id);
	const result = await response.json() as AnimeMeta;

	result.episodes.sort((a,b) => a.number - b.number);
	
	return result;

}
export async function getAnimeEpisode(episodeId:string) {
	console.log('getting anime episode');
	const response = await fetch(backendUrl +'/anime/gogoanime/watch/'+encodeURIComponent(episodeId));
	const result = await response.json();

	return result as AnimeEpisodeData;

}
