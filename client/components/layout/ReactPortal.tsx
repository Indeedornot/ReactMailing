import React, {useState, useLayoutEffect, useId, useEffect} from 'react';
import {createPortal} from 'react-dom';

function createWrapperAndAppendToBody(wrapperId: string) {
	const wrapperElement = document.createElement('div');
	wrapperElement.setAttribute('id', wrapperId);
	document.getElementById('modal-root')!.appendChild(wrapperElement);
	return wrapperElement;
}

//fix for portals not working in ssr
export default function ReactPortal(props: ReactPortalProps) {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return isClient ? <ReactPortalClient wrapperId={props.wrapperId}>{props.children}</ReactPortalClient> : null;
}

type ReactPortalProps = {
	children: React.ReactNode;
	wrapperId?: string;
};

function ReactPortalClient(props: ReactPortalProps) {
	const [wrapperElement, setWrapperElement] = useState<HTMLElement>();
	const id = useId();
	const {children, wrapperId = id} = props;

	useLayoutEffect(() => {
		let element = document.getElementById(wrapperId);
		let systemCreated = false;
		// if element is not found with wrapperId or wrapperId is not provided,
		// create and append to body
		if (!element) {
			systemCreated = true;
			element = createWrapperAndAppendToBody(wrapperId);
		}
		setWrapperElement(element);

		return () => {
			// delete the programatically created element
			if (systemCreated && element?.parentNode) {
				element.parentNode.removeChild(element);
			}
		};
	}, [wrapperId]);

	// wrapperElement state will be null on very first render.
	if (!wrapperElement) return null;

	return createPortal(children, wrapperElement);
}
