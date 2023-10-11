'use client';

import { useState,useEffect } from 'react';
import Button from '../button/Button';
import './contentSwitch.scss';

type ContentSwitchProps = {
	onMediaSwitch?:(mediaType:string)=>void;
	defaultValue?:string;
}
export default function ContentSwitch({onMediaSwitch,defaultValue}:ContentSwitchProps) {

	const [active,setActive] = useState(defaultValue ?? 'anime');

	useEffect(() => {
		onMediaSwitch && onMediaSwitch(active);
	}, [active]);
	
	return (
		<div className="container_content-switch">
			<Button className={"btn_content-type" + ` ${active === 'anime' ? ' active' : '' }`} onClick={()=>setActive('anime')}>
				Anime
			</Button>
			<Button className={"btn_content-type" + ` ${active === 'manga' ? ' active' : '' }`} onClick={()=>setActive('manga')}>
				Manga
			</Button>
			<Button className={"btn_content-type" + ` ${active === 'novel' ? ' active' : '' }`} onClick={()=>setActive('novel')}>
				Novel
			</Button>
		</div>
	);
}