import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from './LogoSvg'

export default function Appheader() {
    return (
      <div className='bg-gray-800 text-white p-4 sticky top-0'>
        <header className="relative flex w-full flex-nowrap items-center justify-between px-3">
        <div className="inline-flex justify-center items-center">
            <Logo className="w-8 h-auto mr-2 fill-white" />
            <h1 className='text-3xl poppins-light'>
               cristallum.io
            </h1>
        </div>
        <nav className="text-xl">
            <ul className='flex items-center space-x-4'>
                <li>
                    <Link to='/' className='hover:underline'>Home</Link>
                </li>
                <li className="mr-2">
                    <Link to='/about' className='hover:underline'>About</Link>
                </li>
                <li>
                    <Link to={'https://github.com/yoshitaka-motomura/aws-lambda-web-adapter-example'} target="_blank">
                    <FaGithub className='text-white' />
                    </Link>
                </li>
            </ul>
        </nav>
      </header>
      </div>
    )
}