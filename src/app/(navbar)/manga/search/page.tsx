import { redirect } from 'next/navigation';

type MangaSearchProps = {
	searchParams:{
		query:string
	}
}

export default function MangaSearch({searchParams}: MangaSearchProps) {
	if(!searchParams?.query){
		redirect('/');

	}
	return (
		<div>Searching for {searchParams.query}</div>
	);
}