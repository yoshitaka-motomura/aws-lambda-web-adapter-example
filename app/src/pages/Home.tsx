import { FaGithub, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Highlight from 'react-highlight'
import 'highlight.js/styles/atom-one-dark.css'
const Home = () =>{
  return (
    <article className="home">
      <section>
        <header className="flex items-center justify-center p-11 h-80 mb-14 rounded-md shadow-secondary-1 bg-gray-900 text-slate-100">
            <h1 className="text-7xl py-12 px-3 poppins-semibold text-center">Using Lambda Web Adapter Example</h1>
        </header>
        <div className="text-center poppins-medium w-5/6 hyphens-auto mx-auto">
            <h2 className="text-6xl font-bold my-6">What is this?</h2>
            <hr className="w-48 h-1 mx-auto my-8 bg-gray-300 border-0 rounded dark:bg-gray-700" />
            <p className="text-xl">This is a sample using the "aws lambda web adapter" to enable running a Lambda function as a web server. In this case,<br /> we are using an Nginx container to run the Lambda function as a web server.</p>
            <p className="text-xl mb-20">For this simple example, we chose Nginx, but you can also use common frameworks such as Node.js or Python by creating Docker images.</p>
        
        <Link className="inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white" to={'https://github.com/awslabs/aws-lambda-web-adapter'} target="_blank">
            <span className="w-5 h-5 me-3"><FaGithub /></span>
            <span className="w-full">aws-lambda-web-adapter</span>
            <FaArrowRight className="w-4 h-4 ms-2 rtl:rotate-180" />
        </Link>
        </div>
        </section>
          <section className="p-10 text-center">
            <h2 className="text-6xl font-bold my-6 poppins-bold">How to use</h2>
            <hr className="w-1/4 h-1 mx-auto my-8 bg-gray-300 border-0 rounded dark:bg-gray-700" />
            <div className="text-left p-6">
              <span className=" text-slate-900 ">E.g: this Dockerfile</span>
              <Highlight className="p-4">
                  FROM node:lts-slim as build <br />
                  WORKDIR /app <br />
                  COPY ./app . <br />
                  RUN npm install -g npm@10.6.0 && npm install && npm run build <br />

                  FROM public.ecr.aws/awsguru/nginx:1.23.2023.3.11.1 as runtime <br />
                  COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.3 /lambda-adapter /opt/extensions/lambda-adapter <br />

                  WORKDIR /var/www/html <br />
                  COPY --from=build /app/dist . <br />

                  COPY ./nginx/nginx.conf /opt/nginx/conf/nginx.conf  <br />
                  COPY ./nginx/conf.d/default.conf /opt/nginx/conf/conf.d/default.conf <br />

                  EXPOSE 8080  <br />
              </Highlight>
              <p className="my-2"><b>The important line is this one</b></p>
              <Highlight className="p-4">
              COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.3 /lambda-adapter /opt/extensions/lambda-adapter 

                </Highlight>
                <div className="pr-8 mt-6">
                <p className="text-lg">Just add a line to your app's Dockerfile to publish it as a Lambda function. If you are already using Docker, you can switch immediately.</p>
                <p className="text-lg"> It is important to note that this is not an affirmation of replacing your current web application with Lambda.
It is an example of one of many different approaches. We hope you will choose the approach that best suits the application you are developing.</p>
                </div>
                
            </div>
        </section>
    </article>
  )
}

export default Home