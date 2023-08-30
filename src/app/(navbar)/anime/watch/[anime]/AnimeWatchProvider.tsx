'use client';
import { AnimeProvider } from '@/types/AnimeEnums';
import React, { createContext, useReducer, useState } from 'react';

type animeWatchProviderProps = {
	children:React.ReactNode
}

const initalData = {
	activeProvider:AnimeProvider.GOGOANIME,
	isFullscreen:false
};

export enum AnimeWatchContextAction {
	SET_PROVIDER = 'set_provider'
};

interface SetProviderAction{
	type: AnimeWatchContextAction.SET_PROVIDER,
	payload: AnimeProvider
}
type Action = SetProviderAction

interface State {
	activeProvider:AnimeProvider,
}

interface ContextType {
	state:State,
	dispatch:React.Dispatch<Action>
}

function animeWatchReducer(state:State,action:Action){
	switch(action.type){
		case AnimeWatchContextAction.SET_PROVIDER:
				const newData = {...state,activeProvider:action.payload};
				return newData;
		default:
			return state;
	}
}

export const AnimeWatchContext = createContext<ContextType | undefined>(undefined);

function AnimeWatchProvider({children}:animeWatchProviderProps){

	const [state,dispatch] = useReducer(animeWatchReducer,initalData);
	
	return (
		<AnimeWatchContext.Provider value={{state,dispatch}}>
			{children}
		</AnimeWatchContext.Provider>
	);
};

export default AnimeWatchProvider;