import { backendUrl } from "./util";

export async function searchNovel(query:string) {
	try{
		const response = await fetch(backendUrl+ '/light-novels/readlightnovels/' + encodeURIComponent(query));
		const result = await response.json();
		return result as NovelSearchResults;
	}catch(err){
		return null;
	}
}