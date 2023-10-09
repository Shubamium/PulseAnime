import { type } from "os";

export type AnimeSearchResult = {
	title:AnimeTitle
	id:string;
	image:string;
	type:string;
}

// export type AnimeDetail = {
// 	title:string;
// 	id:string;
// 	image:string;
// 	genre?:string[];
// 	totalEpisodes:number;
// 	releaseDate:string;
// 	subOrDub:string;
// 	description:string;
// 	type:string;
// 	status:string;
// 	episodes:{
// 		id:string,
// 		number:number
// 	}[]
// }

export type AnimeSearchResults = {
	currentPage: number;
	hasNextPage: boolean;
	results: AnimeSearchResult[];
};


export type AnimeEpisodeSource = {
	url:string,
	isM3U8:boolean,
	quality:string
}

type dateObj = {
	day:number;
	month:number;
	year:number;
}
export type AnimeMeta = {
	id:string;
	title:AnimeTitle
	image:string;
	cover:string;
	trailer:{
		id:string;
		site:string;
		thumbnail:string;
	};
	description:string;
	genres:string[];
	status:string;
	totalEpisodes:number;
	currentEpisodes:number;
	releaseDate:string;
	season:string;
	subOrDub:string;
	type:string;
	episodes:AnimeEpisode[];
	recommendations:AnimeRecommendation[];
	studios:string[];
	startDate:dateObj;
	duration:number;
	rating:number;
	popularity:number;
	endDate:dateObj;
	synonyms:string[];

};


export type AnimeRecommendation = {
	id:number;
	title:AnimeTitle;
	status:string;
	image:string;
	cover:string;
	rating:number;
	type:string;
	episodes:number;
}
export type AnimeEpisode ={
	id:string,
	number:number,
	title?:string,
	image?:string,
	description?:string
};

export type AnimeTitle = {
	romaji:string;
	english:string;
	native:string;
};


