import {ImapDataContext} from '@/context/ImapDataContext';
import Modal from '../modal/Modal';
import {useContext} from 'react';
import {ImapDataModel, ImapDataSchema} from '@/shared/models/ImapDataModel';
import {useZorm} from 'react-zorm';

const InputStyle = 'block w-full rounded-md h-25 mt-3 first:mt-0';

export const LoginModal = ({setIsModalOpen}: LoginModalProps) => {
	const zo = useZorm('LogIn', ImapDataSchema, {
		onValidSubmit: (e) => {
			e.preventDefault();
			handleLogin(e.data);
		},
	});
	const disabled = zo.validation?.success === false;

	const {setImapData} = useContext(ImapDataContext);
	const handleLogin = (data: ImapDataModel) => {
		setImapData(data);
		setIsModalOpen(false);
	};

	return (
		<Modal setIsOpen={setIsModalOpen} className='w-11/12'>
			<div className='w-full h-full flex flex-col bg-primary justify-items-center rounded-md px-2.5 py-3.5'>
				<form ref={zo.ref} className='flex flex-col'>
					<input type='text' name={zo.fields.username()} className={InputStyle} placeholder='Email' />
					{zo.errors.username((e) => (
						<ErrorMessage message={e.message} />
					))}

					<input type='password' name={zo.fields.password()} className={InputStyle} placeholder='Password' />
					{zo.errors.password((e) => (
						<ErrorMessage message={e.message} />
					))}

					<input type='text' name={zo.fields.host()} className={InputStyle} placeholder='Imap Host' />
					{zo.errors.host((e) => (
						<ErrorMessage message={e.message} />
					))}

					<input type='number' min='0' name={zo.fields.port()} className={InputStyle} placeholder='Imap Port' />
					{zo.errors.port((e) => (
						<ErrorMessage message={e.message} />
					))}

					<div className='flex flex-row justify-between mt-3'>
						<label>
							<input type='checkbox' defaultChecked={false} name={zo.fields.tls()} />
							<span className='ml-2 text-primary align-middle'>Use TLS</span>
						</label>
						<input
							disabled={disabled}
							type='submit'
							className='h-8 mt-1 w-44 bg-secondary hover:bg-accent m-0 p-0 rounded-md text-primary'
						/>
					</div>
				</form>
			</div>
		</Modal>
	);
};

const ErrorMessage = ({message}: {message: string}) => {
	return <div className='text-red-600 ml-0.5 text-[12px]'>{message}</div>;
};

type LoginModalProps = {
	setIsModalOpen: (open: boolean) => void;
};
