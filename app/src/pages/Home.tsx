import { FaGithub, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const Home = () =>{
  return (
    <div className="home">
        <header className="flex items-center justify-center p-11 h-80 rounded-md shadow-secondary-1 bg-gray-800 text-slate-100">
            <h1 className="text-5xl py-10">Using Lambda Web Adapter Example</h1>
        </header>
        <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-16 dark:bg-gray-700" />
        <section className="text-center">
            <h2 className="text-4xl font-extrabold py-4">What is this?</h2>
            <p className="text-lg">This is a sample using the "aws lambda web adapter" to enable running a Lambda function as a web server. In this case,<br /> we are using an Nginx container to run the Lambda function as a web server.</p>
            <p className="text-lg mb-20">For this simple example, we chose Nginx, but you can also use common frameworks such as Node.js or Python by creating Docker images.</p>
        
        <Link className="inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white" to={'https://github.com/awslabs/aws-lambda-web-adapter'} target="_blank">
            <span className="w-5 h-5 me-3"><FaGithub /></span>
            <span className="w-full">aws-lambda-web-adapter</span>
            <FaArrowRight className="w-4 h-4 ms-2 rtl:rotate-180" />
        </Link>



        </section>
    </div>
  )
}

export default Home