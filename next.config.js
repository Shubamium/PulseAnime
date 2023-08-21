/**
 *  @type {import('next').NextConfig}
 *  */
const nextConfig = {
	images:{
		remotePatterns:[
			{
				protocol:'https',
				hostname:'gogocdn.net',
			},{
				protocol:'https',
				hostname:'s4.anilist.co'
			}
		]
	}
}

module.exports = nextConfig
