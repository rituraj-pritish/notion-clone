import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import ReactModal from 'react-modal'
import { QueryClientProvider } from 'react-query'

import queryClient from '@/core/queryClient'
import useWorkspace from '@/hooks/useWorkspace'

export const Providers = ({ children }: { children: React.ReactChild }) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}

function MyApp({ Component, pageProps }: AppProps) {
	useWorkspace()

	useEffect(() => {
		ReactModal.setAppElement('#__next')
	}, [])

	return (
		<Providers>
			<Component {...pageProps} />
		</Providers>
	)
}

export default MyApp
