import { FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Logo from './LogoSvg'

export default function Appheader() {
  return (
    <div className="sticky top-0 bg-gray-800 p-4 text-white">
      <header className="relative flex w-full flex-nowrap items-center justify-between px-3">
        <div className="inline-flex items-center justify-center">
          <Logo className="mr-2 h-auto w-8 fill-white" />
          <h1 className="poppins-light text-3xl">cristallum.io</h1>
        </div>
        <nav className="text-xl">
          <ul className="flex items-center space-x-4">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li className="mr-2">
              <Link to="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link
                to={
                  'https://github.com/yoshitaka-motomura/aws-lambda-web-adapter-example'
                }
                target="_blank"
              >
                <FaGithub className="text-white" />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}
