'use client';
import {useState, useEffect} from 'react';
import SearchBar from '../searchBar/SearchBar';
import ContentSwitch from '../contentSwitch/ContentSwitch';
import { IS_SERVER } from '../../../../util/utility';

type MediaSearchProps = {
	useAltColor?:boolean
	reverseOrder?:boolean
}

const MEDIA_TYPE = 'MEDIA_TYPE';
export default function MediaSearch({useAltColor,reverseOrder}: MediaSearchProps) {

	// Get the active media type from local storage
	// let savedMediaType: string= '';
	// if(typeof window !== 'undefined'){
	// 	savedMediaType = localStorage.getItem(MEDIA_TYPE) ?? 'anime';
	// }
	const [mediaType,setMediaType] = useState('anime') ;


	// Reverse the order of render for Navbar and MainHome title
	const switcher = <ContentSwitch onMediaSwitch={(media)=>{
			setMediaType(media);
			if(typeof window !== 'undefined'){
				localStorage.setItem(MEDIA_TYPE,media);
			}
		}
	} active={mediaType}/>;
	
	useEffect(() => {
		let savedMediaType = localStorage.getItem(MEDIA_TYPE) ?? 'anime';
		setMediaType(savedMediaType);
	}, []);
	
	const searchBar = <SearchBar placeholder="Search for the title here!" altSearchColor={useAltColor} route={`/${mediaType}/search`}/>;

	return (
		<>
			{reverseOrder ? 
				<>
					{switcher}
					{searchBar}
				</> 
			: 
				<>
					{searchBar}
					{switcher}
				</>
			}
		</>
	);
}