import {ShoppingCart, UserIcon} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { APP_Name } from '@/lib/constants';

const Header = () => {
    return <header className = 'w-full border-b'>
        <div className='wrapper flex-between'>
            <div className='flex-start'>
                <Link href='/' className = 'flex-start'>
                    <Image 
                        src = '/images/logo.svg' 
                        alt={`${APP_Name} logo`}
                        height={48} 
                        width={48} 
                        priority={true}
                    />
                    <span className="hidden lg:block font-bold text-2xl ml-3">
                        {APP_Name}
                    </span>
                </Link>
            </div>
        </div>
    </header>
};

export default Header;