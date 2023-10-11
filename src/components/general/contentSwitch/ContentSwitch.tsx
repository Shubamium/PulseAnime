'use client';

import { useState,useEffect } from 'react';
import Button from '../button/Button';
import './contentSwitch.scss';

type ContentSwitchProps = {
	onMediaSwitch?:(mediaType:string)=>void;
	defaultValue?:string;
	active:string;
}
export default function ContentSwitch({onMediaSwitch,defaultValue,active}:ContentSwitchProps) {

	// const [active,setActive] = useState(defaultValue ?? 'anime');

	// useEffect(() => {
	// 	onMediaSwitch && onMediaSwitch(active);
	// }, [active]);

	return (
		<div className="container_content-switch">
			<Button className={"btn_content-type" + ` ${active === 'anime' ? ' active' : '' }`} onClick={()=>onMediaSwitch && onMediaSwitch('anime')}>
				Anime
			</Button>
			<Button className={"btn_content-type" + ` ${active === 'manga' ? ' active' : '' }`} onClick={()=>onMediaSwitch && onMediaSwitch('manga')}>
				Manga
			</Button>
			<Button className={"btn_content-type" + ` ${active === 'novel' ? ' active' : '' }`} onClick={()=>onMediaSwitch && onMediaSwitch('novel')}>
				Novel
			</Button>
		</div>
	);
}