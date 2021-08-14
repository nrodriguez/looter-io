import Image from 'next/image';
import logo from '../public/logo.png';

const Header = (): JSX.Element => {
  return (
    <div className="text-center">
      <Image className="rounded-lg" src={logo} />
    </div>
  );
};

export default Header;
