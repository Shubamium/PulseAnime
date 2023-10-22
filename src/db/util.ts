import { AnimeTitle } from "@/types/AnimeTypes";
import { month } from "../../util/utility";

export const backendUrl = process.env.NEXT_PUBLIC_DB_HOST ?? 'http://127.0.0.1:3173';
// export const backendUrl = 'https://pulseanime-be.vercel.app';
export const corsUrl = 'https://pulseanime-cors.vercel.app/api';


export function splitIntoParagraphs(sentence:string) {
	const sentences = sentence.split('. ');
	const paragraphs:string[] = [];
	let currentParagraph:string = '';
  
	for (const sentence of sentences) {
	  if (currentParagraph.split('. ').length < 3) {
		currentParagraph += sentence + '. ';
	  } else {
		paragraphs.push(currentParagraph);
		currentParagraph = sentence + '. ';
	  }
	}
  
	if (currentParagraph) {
	  paragraphs.push(currentParagraph);
	}
  
	return paragraphs;
  }
  
export function getTitle(title:AnimeTitle){
	return title?.english || title?.romaji || title?.native || 'No Title';
	
}
  

export function getEnumKeyByValue(enumObj: any, value: string): string | undefined {
	for (const key in enumObj) {
	  if (enumObj.hasOwnProperty(key) && enumObj[key] === value) {
		return key;
	  }
	}
	return undefined;
}
  


export function getChapterNumber(chapterId:string,fallback?:string){
	if(chapterId === '') return fallback;
	return chapterId.match(/\d+\.\d+|\d+/g);
}

export function getReleaseDate(timestring:string){
	let releaseDate = new Date(timestring);
	return releaseDate.getDate() + ' ' + month[releaseDate.getMonth()] + ', ' + releaseDate.getFullYear(); 
}