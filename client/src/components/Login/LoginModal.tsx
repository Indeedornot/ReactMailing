import {ImapDataContext} from '@/context/ImapDataContext';
import Modal from '../modal/Modal';
import {useContext, useState} from 'react';
import {ImapDataModel} from '@/shared/models/ImapDataModel';

const InputStyle = 'block w-full rounded-md h-25 mb-3';

const minPortValue = 100;
const maxPortValue = 999;

export const LoginModal = ({setIsModalOpen}: LoginModalProps) => {
	const {setImapData} = useContext(ImapDataContext);
	const [formData, setFormData] = useState<ImapDataModel>({
		host: '',
		port: 0,
		username: '',
		password: '',
		tls: false,
	});

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const target = event.target;
		const value = getInputValue(target);
		const name = target.name;

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const getInputValue = (target: HTMLInputElement) => {
		switch (target.type) {
			case 'checkbox':
				return target.checked;
			case 'number':
				return parseInt(target.value);
			default:
				return target.value;
		}
	};

	const handleLogin = (event: React.SyntheticEvent) => {
		event.preventDefault();
		const success = setImapData(formData);
		if (!success) return;

		setIsModalOpen(false);
	};

	return (
		<Modal setIsOpen={setIsModalOpen} className='w-11/12'>
			<div className='w-full h-full flex flex-col bg-primary justify-items-center rounded-md px-2.5 py-3.5'>
				<form onSubmit={handleLogin} className='flex flex-col'>
					<input
						type='text'
						name='username'
						className={InputStyle}
						value={formData.username}
						placeholder='Email'
						onChange={handleInputChange}
					/>
					<input
						type='password'
						name='password'
						className={InputStyle}
						placeholder='Password'
						onChange={handleInputChange}
					/>
					<input type='text' name='host' className={InputStyle} placeholder='Imap Host' onChange={handleInputChange} />
					<input
						type='number'
						name='port'
						min={minPortValue}
						max={maxPortValue}
						className={InputStyle}
						placeholder='Imap Port'
						onChange={handleInputChange}
					/>
					<div className='flex flex-row justify-between'>
						<label>
							<input type='checkbox' name='tls' checked={formData.tls} onChange={handleInputChange} />
							<span className='ml-2 text-font-primary align-middle'>Use TLS</span>
						</label>
						<input
							type='submit'
							className='h-8 mt-1 w-44 bg-secondary hover:bg-accent m-0 p-0 rounded-md text-font-primary'
						/>
					</div>
				</form>
			</div>
		</Modal>
	);
};

type LoginModalProps = {
	setIsModalOpen: (open: boolean) => void;
};
