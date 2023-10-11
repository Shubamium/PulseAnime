import React from 'react';

type Props = {
	searchQuery:{
		query:string
	}
}

export default function MangaSearch({searchQuery}: Props) {
	return (
		<div>Searching for {searchQuery.query}</div>
	);
}