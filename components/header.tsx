import Image from 'next/image';
import logo from '../public/logo.png';

const Header = (): any => {
  return (
    <header className=''>
      <Image 
        className='object-contain bg-center'
        src={logo}
      />
    </header>
  );
};

export default Header;
