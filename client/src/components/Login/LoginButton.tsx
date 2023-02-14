import {useEffect, useContext, useState} from 'react';
import cx from 'classnames';
import {ImapDataContext} from '@/context/ImapDataContext';
import {LoginModal} from './LoginModal';

//TODO: Add error messages
export function LoginButton({className}: {className?: string}) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const {isLoggedIn, deleteImapData} = useContext(ImapDataContext);
	useEffect(() => {
		if (isLoggedIn) {
			setIsModalOpen(false);
		}
	}, [isLoggedIn]);

	return (
		<>
			<button
				className={cx(className)}
				onClick={() => {
					if (isLoggedIn) {
						deleteImapData();
						return;
					}

					setIsModalOpen(true);
				}}>
				{isLoggedIn ? 'Logout' : 'Login'}
			</button>
			{isModalOpen && <LoginModal setIsModalOpen={setIsModalOpen}></LoginModal>}
		</>
	);
}
