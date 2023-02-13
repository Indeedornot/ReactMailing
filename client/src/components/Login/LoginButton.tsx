import React, {useContext, useState} from 'react';
import {ImapDataModel} from '@/shared/models/ImapDataModel';
import Modal from '@/components/modal/Modal';
import {Toggle} from 'react-toggle-component';
import cx from 'classnames';
import {ImapDataContext} from '@/context/ImapDataContext';

const InputStyle = 'block w-full rounded-md h-25 mb-3';

//TODO: Add error messages
export function LoginButton({className}: {className?: string}) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const {isLoggedIn, setImapData, deleteImapData} = useContext(ImapDataContext);

	const handleLogin = (event: React.SyntheticEvent) => {
		event.preventDefault();
		const target = event.target as typeof event.target & ImapInputType;
		const imapData: ImapDataModel = {
			host: target.host.value,
			port: parseInt(target.port.value),
			username: target.username.value,
			password: target.password.value,
			tls: target.tls.checked,
		};
		const success = setImapData(imapData);
		if (!success) return;

		setIsModalOpen(false);
	};

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
			{!isLoggedIn && isModalOpen && (
				<Modal setIsOpen={setIsModalOpen} className='w-11/12 h-1/2 flex justify-self'>
					<div className='w-full h-full flex flex-col justify-items-center bg-secondary rounded-md px-2.5 py-3.5'>
						<form onSubmit={handleLogin}>
							<input type='text' className={InputStyle} placeholder='Email' name='username' />
							<input type='password' className={InputStyle} placeholder='Password' name='password' />
							<input type='text' className={InputStyle} placeholder='Imap Host' name='host' />
							<input type='number' min='0' className={InputStyle} placeholder='Imap Port' name='port' />
							<Toggle leftBackgroundColor='white' rightBackgroundColor='blue' name='tls' className='block' />
							<input
								type='submit'
								className='h-6 w-44 bg-primary hover:bg-accent m-0 p-0 rounded-full text-font-primary'
							/>
						</form>
					</div>
				</Modal>
			)}
		</>
	);
}

type ImapInputType = {
	host: {value: string};
	port: {value: string};
	username: {value: string};
	password: {value: string};
	tls: {checked: boolean};
};
