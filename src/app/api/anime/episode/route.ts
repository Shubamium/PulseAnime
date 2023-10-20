import { getAnimeEpisodeUrl } from "@/db/AnimeData";
import { AnimeProvider } from "@/types/AnimeEnums";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,res:NextResponse){
	const body = req.body;
	const reqUrl = new URL(req.url);
	const provider = reqUrl.searchParams.get('provider');
	const id = reqUrl.searchParams.get('id');
	try{
		if(provider && id){

			const animeReq = await fetch(getAnimeEpisodeUrl(id,AnimeProvider[provider]));
			const animeRes = await animeReq.json();
			if(animeReq.ok){
				return NextResponse.json(JSON.stringify(animeRes));
			}else{
				throw new Error('Server did not respond');
			}
		}
	}catch(err:unknown){
		return NextResponse.json(JSON.stringify({
			message:err
		}));
	}
	// console.log( ,'rendered');
}