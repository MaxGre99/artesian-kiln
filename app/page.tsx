import DesktopLayout from '@/components/DesktopLayout';
import MobileLayout from '@/components/MobileLayout';
import PageHeader from '@/components/PageHeader';

export default function Home() {
	return (
		<div className='flex flex-col'>
			<PageHeader />

			<div className='flex flex-col flex-1 min-h-full md:hidden'>
				<MobileLayout />
			</div>

			<div className='hidden md:flex flex-col flex-1 min-h-full'>
				<DesktopLayout />
			</div>
		</div>
	);
}
