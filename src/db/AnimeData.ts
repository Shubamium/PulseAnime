import {  AnimeEpisodeSource, AnimeMeta, AnimeSearchResults } from "@/types/AnimeTypes";
import { backendUrl, corsUrl, getEnumKeyByValue } from "./util";
import { AnimeProvider } from "@/types/AnimeEnums";

const zoroUrl = (episodeId:string) => backendUrl + `/anime/zoro/watch?episodeId=${episodeId}`;
const enimeUrl = (episodeId:string) => backendUrl + `/anime/enime/watch?episodeId=${episodeId}`;
const animepaheUrl = (episodeId:string) => backendUrl + `/anime/animepahe/watch/${episodeId}`;
const animefoxUrl = (episodeId:string) => backendUrl + `/anime/animefox/watch?episodeId=${episodeId}`;
const gogoanimeUrl = (episodeId:string) => backendUrl + `/anime/gogoanime/watch/${episodeId}`;
const nineanimeUrl = (episodeId:string) => backendUrl + `/anime/9anime/watch/${episodeId}`;


export const getAnimeEpisodeUrl = (episodeId:string,provider:AnimeProvider)=>{
	switch(provider){
		case AnimeProvider.GOGOANIME:
			return gogoanimeUrl(episodeId);
		case AnimeProvider.NINEANIME:
			return nineanimeUrl(episodeId);
		default:
			return gogoanimeUrl(episodeId);
		// case AnimeProvider.ZORO:
		// 	return zoroUrl(episodeId);
		// // case AnimeProvider.ENIME:
		// 	return enimeUrl(episodeId);
		// case AnimeProvider.ANIMEPAHE:
		// 	return animepaheUrl(episodeId);
		// case AnimeProvider.ANIMEFOX:
		// 	return animefoxUrl(episodeId);
	}
}; 

export async function getAnimeSearch(query:string) {

	const result = await fetch(backendUrl + '/meta/anilist/' + encodeURIComponent(query));
	const res = await result.json();

	return res as AnimeSearchResults;
}


export async function getAnimeMeta(id:string,provider?:AnimeProvider) {

	const endpoint = new URL(backendUrl +'/meta/anilist/info/'+ id + (provider ? `?provider=${getEnumKeyByValue(AnimeProvider,provider)}` :'' ));
	console.log(endpoint.toString());
	const response = await fetch(endpoint);
	const result = await response.json() as AnimeMeta;

	if(!response.ok){
		const response = await fetch(backendUrl +'/meta/anilist/info/'+ id );
		const result = await response.json() as AnimeMeta;
		return result;
	};
	result.episodes?.sort((a,b) => a.number - b.number);
	return result;


}

export async function getAnimeEpisode(episodeId:string) {
	
	const targetUrl = backendUrl +'/anime/gogoanime/watch/'+encodeURIComponent(episodeId);
	const response = await fetch(targetUrl);
	console.log('getting anime episode',targetUrl);
	const result = await response.json();
	
	return result as AnimeEpisodeSource;

}
