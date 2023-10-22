import { MangaChapter, MangaChapterPages, MangaMeta, MangaSearchResult } from "@/types/MangaTypes";
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
		const url = backendUrl+ '/meta/anilist-manga/info/' + encodeURIComponent(title);
		console.log(url);
		const response =  await fetch(url);
		const result = await response.json();
		if(response.ok){
			return result as MangaMeta;
		}else{
			return null;
		}
	}catch(err){
		return null;
	}
}


export async function getMangaChapter(chapterId:string) {
	try{
		const url = backendUrl+ `/meta/anilist-manga/read?chapterId=${encodeURIComponent(chapterId)}`;
		console.log(url);
		const response =  await fetch(url);
		const result = await response.json();
		if(response.ok){
			return result as MangaChapterPages[];
		}else{
			return null;
		}
	}catch(err){
		return null;
	}
}
