type NovelMeta = {
	id: string;
	title:string;
	image:string;
	author:string;
	genres:string[];
	rating:number;
	views:number;
	description:string;
	status:string;
	pages:string;
	chapters:NovelChapter[]
}

type NovelChapter = {
	id:string;
	title:string;
}

type NovelSearchMeta = {
	id:string;
	title:string;
	image:string;
}

type NovelSearchResults = {
	results: NovelSearchMeta[];
	currentPage: number;
	hasNextPage: boolean;
}