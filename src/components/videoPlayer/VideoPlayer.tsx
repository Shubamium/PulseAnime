'use client';
import Artplayer from "artplayer";
import Hls from "hls.js";
import { useEffect,useRef } from "react";
import {type Option as PlayerOption} from 'artplayer/types/option';
import { AnimeEpisodeSource } from "@/types/AnimeTypes";
import './videoPlayer.scss';
type videoPlayerProps = {
	videoInfo:AnimeEpisodeSource[];
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

export default function VideoPlayer({videoInfo}: videoPlayerProps) {
	
	const artPlayer = useRef<HTMLDivElement>(null);

	useEffect(()=>{
		let art:Artplayer;
		if(videoInfo){
			const sourceList = videoInfo.map((episodeSource)=>{
				return {
					html:episodeSource.quality,
					url:episodeSource.url,
					default:episodeSource.quality === '1080p'
				};
			});
			// videoInfo.find((episodeSource)=>)
			if(artPlayer.current && sourceList.length > 1){
				const type = videoInfo[0].isM3U8 ? 'm3u8' : 'default';
				art = new Artplayer(
					{
						...options,
						container: artPlayer.current,
						type:type,
						url:sourceList.find((source)=>source.default)?.url ?? sourceList[sourceList.length - 1].url,
						customType:{
							m3u8: playM3u8 
						},
						// quality:sourceList ?? '',
						autoplay:true,
						autoSize:true,
						fullscreen:true,
						screenshot:true,
						setting:true,

					}
				);
				art.play().catch((err)=>{
					console.warn(err);
				});
				return ()=>{
					if(art && art.destroy){
						art.destroy(false);
					}
				};
			}
		}
		console.log('video info changed');
		
		return ()=>{
			if(art && art.destroy){
				art.destroy(false);
			}
		};
	},[videoInfo]);
	
	return (
		<div className="video-player">
			<div className="art-player" ref={artPlayer} style={{aspectRatio:'16 / 9'}}></div>
		</div>
	);
}