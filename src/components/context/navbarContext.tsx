'use client';
import React,{createContext,useEffect,useState} from 'react';

const initialValue = {
	navbarOpen:true,
	isBleeding:false,
	setNavbar:(state:boolean)=>{},
	setBleeding:(state:boolean)=>{},
};
export const NavbarContext = createContext(initialValue);

type NavbarContextProps = {
	children:React.ReactNode
}

export default function NavbarContextProvider({children}: NavbarContextProps) {
	const [navbarOpen,setNavbarOpen] = useState(true);
	const [isBleeding,setIsBleeding] = useState(true);
	const value = {
		navbarOpen,
		isBleeding,
		setNavbar:(state:boolean)=>{
			setNavbarOpen(state);
		},
		setBleeding:(state:boolean)=>{
			setIsBleeding(state);
		}
	};
	return (
		<NavbarContext.Provider value={value}>
			{children}
		</NavbarContext.Provider>
	);
}