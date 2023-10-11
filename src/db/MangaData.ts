import { MangaSearchResult } from "@/types/MangaTypes";
import { backendUrl } from "./util";


export async function searchManga(query:string) {
	try{
		const response = await fetch(backendUrl+ '/meta/anilist-manga/' + encodeURIComponent(query));
		const result = await response.json();
		console.log('hey',query);
		return result as MangaSearchResult;
	}catch(err){
		return null;
	}
}
export async function getMangaMeta(title:string) {
	try{
		const response = fetch(backendUrl+ '/meta/anilist-manga/info/' + encodeURIComponent(title));
	}catch(err){

	}
}

