import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Global hook to restore scroll position to the top of the viewport
 * whenever the route changes.
 */
export function useScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0); // instant reset, without behavior: 'smooth'
	}, [pathname]);
}
