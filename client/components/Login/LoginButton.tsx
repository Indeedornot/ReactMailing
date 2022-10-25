import React, {useState} from 'react';
import {ImapDataModel, isValidImapData} from '@/shared/emails/models/ImapDataModel';
import Modal from '@/components/modal/Modal';
import {Toggle} from 'react-toggle-component';
import {cx} from 'twind';

const LoginButtonStyles = {
	button: 'h-6 w-44 bg-primary hover:bg-accent m-0 p-0 rounded-full text-font-primary',
	modal: {
		input: 'block w-full rounded-md h-25 mb-3',
	},
};

//TODO: Add error messages
export function LoginButton({className}: {className?: string}) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLogin = (event: React.SyntheticEvent) => {
		event.preventDefault();
		const target = event.target as typeof event.target & ImapInputType;
		const imapData: ImapDataModel = {
			host: target.host.value,
			port: target.port.value,
			username: target.username.value,
			password: target.password.value,
			tls: target.tls.checked,
		};
		if (!isValidImapData(imapData)) return;
		setIsLoggedIn(true);
		setIsModalOpen(false);
		localStorage.setItem('imapData', JSON.stringify(imapData));
	};

	return (
		<>
			<button
				className={cx(className)}
				onClick={() => {
					if (isLoggedIn) {
						localStorage.removeItem('imapData');
						setIsLoggedIn(false);
					} else {
						setIsModalOpen(true);
					}
				}}>
				{isLoggedIn ? 'Logout' : 'Login'}
			</button>
			{!isLoggedIn && isModalOpen && (
				<Modal setIsOpen={setIsModalOpen} className='w-11/12 h-1/2 flex justify-self'>
					<div className='w-full h-full flex flex-col justify-items-center bg-secondary rounded-md px-2.5 py-3.5'>
						<form onSubmit={handleLogin}>
							<input type='text' className={LoginButtonStyles.modal.input} placeholder='Email' name='username' />
							<input type='password' className={LoginButtonStyles.modal.input} placeholder='Password' name='password' />
							<input type='text' className={LoginButtonStyles.modal.input} placeholder='Imap Host' name='host' />
							<input
								type='number'
								min='0'
								className={LoginButtonStyles.modal.input}
								placeholder='Imap Port'
								name='port'
							/>
							<Toggle leftBackgroundColor='white' rightBackgroundColor='blue' name='tls' className='block' />
							<input type='submit' className={LoginButtonStyles.button} />
						</form>
					</div>
				</Modal>
			)}
		</>
	);
}

type ImapInputType = {
	host: {value: string};
	port: {value: number};
	username: {value: string};
	password: {value: string};
	tls: {checked: boolean};
};
