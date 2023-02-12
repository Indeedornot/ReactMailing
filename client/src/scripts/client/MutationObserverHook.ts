import {useEffect, useState} from 'react';

type Options = {
	config: MutationObserverInit;
};

/**
 * This custom hooks abstracts the usage of the Mutation Observer with React components.
 * Watch for changes being made to the DOM tree and trigger a custom callback.
 * @param targetEl DOM element to be observed
 * @param cb callback that will run when there's a change in targetEl or any
 * child element (depending on the provided options)
 * @param options
 * @param options.config check \[options\](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe)
 */
export const useMutationObservable = (targetEl: HTMLElement, cb: MutationCallback, options: Options) => {
	const [observer, setObserver] = useState<MutationObserver | null>(null);

	useEffect(() => {
		const obs = new MutationObserver(cb);
		setObserver(obs);
	}, [cb, options, setObserver]);

	useEffect(() => {
		if (!observer) return;
		observer.observe(targetEl, options.config);
		return () => {
			if (observer) {
				observer.disconnect();
			}
		};
	}, [observer, targetEl, options]);
};
