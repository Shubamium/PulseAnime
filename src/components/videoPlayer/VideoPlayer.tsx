'use client';
import Artplayer from "artplayer";
import Hls from "hls.js";
import { useEffect,useRef } from "react";
import {type Option as PlayerOption} from 'artplayer/types/option';
type Props = {
	url:string;
}

const options:PlayerOption = {
	url:'',
	container:''
};

function playM3u8(video:any, url:any, art:any) {
    if (Hls.isSupported()) {
        if (art.Hls) art.hls.destroy();
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        art.hls = hls;
        art.on('destroy', () => hls.destroy());
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
    } else {
        art.notice.show = 'Unsupported playback format: m3u8';
    }
}

export default function VideoPlayer({url}: Props) {
	
	const artPlayer = useRef<HTMLDivElement>(null);

	useEffect(()=>{
		if(artPlayer.current && url){
			const art = new Artplayer(
				{
					...options,
					url:url,
					container: artPlayer.current,
					type:'m3u8',
					customType:{
						m3u8: playM3u8 
					}
				}
			);

			return ()=>{
				if(art && art.destroy){
					art.destroy(false);
				}
			};
		}
	},[]);
	
	return (
		<div>
			<div className="art-player" ref={artPlayer} style={{aspectRatio:'16 / 9'}}></div>
		</div>
	);
}