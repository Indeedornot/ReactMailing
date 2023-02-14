import EmailDisplay from '@/components/email/EmailDisplay';
import {ThemeToggle} from '@/components/theme/ThemeToggle';
import {LoginButton} from '@/components/Login/LoginButton';

export default function App() {
	return (
		<div className='flex flex-col bg-secondary w-full h-full'>
			{/* Header */}
			<div className='h-[11%] w-full'>
				<div className='h-1/3 bg-primary text-primary grid grid-cols-12 justify-items-center items-center'>
					<div className='col-span-3 flex'>
						<ThemeToggle />
					</div>
					<div className='col-span-6'></div>
					<div className='col-span-3'>
						<LoginButton />
					</div>
				</div>
			</div>
			{/* Body */}
			<div className='flex-grow'>
				<EmailDisplay />
			</div>
		</div>
	);
}
