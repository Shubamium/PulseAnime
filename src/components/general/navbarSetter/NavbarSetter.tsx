'use client';
import { NavbarContext } from '@/components/context/navbarContext';
import {useContext,useEffect} from 'react';
import React from 'react';

type Props = {}

export default function NavbarSetter({}: Props) {
	const navbarContext = useContext(NavbarContext);
	useEffect(() => {
	  navbarContext.setNavbar(false);
	   navbarContext.setBleeding(false);
	   return () => {
		   navbarContext.setNavbar(true);
		   navbarContext.setBleeding(true);
	  };
	}, []);
	
  return (
	<></>
  );
}