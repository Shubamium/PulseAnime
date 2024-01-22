type NovelMeta = {
	id: string;
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