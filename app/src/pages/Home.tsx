import { FaGithub, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Highlight from 'react-highlight'
import 'highlight.js/styles/atom-one-dark.css'
import { HiExternalLink } from 'react-icons/hi'
const Home = () => {
  return (
    <article className="home">
      <section>
        <header className="shadow-secondary-1 mb-14 flex h-80 items-center justify-center rounded-md bg-gray-900 p-11 text-slate-100">
          <h1 className="poppins-semibold px-3 py-12 text-center text-7xl">
            Using Lambda Web Adapter Example
          </h1>
        </header>
        <div className="poppins-medium mx-auto w-5/6 hyphens-auto text-center">
          <h2 className="my-6 text-6xl font-bold">What is this?</h2>
          <hr className="mx-auto my-8 h-1 w-48 rounded border-0 bg-gray-300 dark:bg-gray-700" />
          <p className="text-xl">
            This is a sample using the "aws lambda web adapter" to enable
            running a Lambda function as a web server. In this case,
            <br /> we are using an Nginx container to run the Lambda function as
            a web server.
          </p>
          <p className="mb-20 text-xl">
            For this simple example, we chose Nginx, but you can also use common
            frameworks such as Node.js or Python by creating Docker images.
          </p>

          <Link
            className="inline-flex items-center justify-center rounded-lg bg-gray-50 p-5 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            to={'https://github.com/awslabs/aws-lambda-web-adapter'}
            target="_blank"
          >
            <span className="me-3 h-5 w-5">
              <FaGithub />
            </span>
            <span className="w-full">aws-lambda-web-adapter</span>
            <FaArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </section>
      <section className="p-10 text-center">
        <h2 className="poppins-bold my-6 text-6xl font-bold">How to use</h2>
        <hr className="mx-auto my-8 h-1 w-1/4 rounded border-0 bg-gray-300 dark:bg-gray-700" />
        <div className="p-6 text-left">
          <span className=" text-slate-900 ">E.g: this Dockerfile</span>
          <Highlight className="p-4">
            FROM node:lts-slim as build <br />
            WORKDIR /app <br />
            COPY ./app . <br />
            RUN npm install -g npm@10.6.0 && npm install && npm run build <br />
            FROM public.ecr.aws/awsguru/nginx:1.23.2023.3.11.1 as runtime <br />
            COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.3
            /lambda-adapter /opt/extensions/lambda-adapter <br />
            WORKDIR /var/www/html <br />
            COPY --from=build /app/dist . <br />
            COPY ./nginx/nginx.conf /opt/nginx/conf/nginx.conf <br />
            COPY ./nginx/conf.d/default.conf /opt/nginx/conf/conf.d/default.conf{' '}
            <br />
            EXPOSE 8080 <br />
          </Highlight>
          <p className="my-2">
            <b>The important line is this one</b>
          </p>
          <Highlight className="p-4">
            COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.3
            /lambda-adapter /opt/extensions/lambda-adapter
          </Highlight>
          <div className="mt-6 pr-8">
            <p className="text-lg">
              Just add a line to your app's Dockerfile to publish it as a Lambda
              function. If you are already using Docker, you can switch
              immediately.
            </p>
            <p className="text-lg">
              {' '}
              It is important to note that this is not an affirmation of
              replacing your current web application with Lambda. It is an
              example of one of many different approaches. We hope you will
              choose the approach that best suits the application you are
              developing.
            </p>
          </div>
        </div>
        <hr className="mx-auto my-10 h-1 w-1/4 rounded border-0 bg-gray-300 dark:bg-gray-300" />
        <div>
          <header className="mb-8 py-8">
            <h2 className="font-sans text-6xl font-bold">Annotation</h2>
            <div className="text-lg text-gray-500">
              Examples using the AWS API Gateway Rest API are publicly
              available.
              <a href="https://orion.cristallum.io" className="pl-2 underline">
                Example Page <HiExternalLink className="inline-block" />
              </a>
            </div>
          </header>
          <section className="mb-6 rounded bg-white p-6 text-left shadow-lg">
            <h3 className="mb-4 font-poppins text-3xl">Using HTTP API</h3>
            <p className="text-gray-700">
              In the case of HTTP API, you can use a relatively free Docker
              image as a base image, but you cannot configure settings such as
              WAF. This is not a Web Adapter limitation, but an HTTP API
              specification.
            </p>
          </section>
          <section className="rounded bg-white p-6 text-left shadow-lg">
            <h3 className="mb-4 font-poppins text-3xl">Using Rest API</h3>
            <p>
              When using WAF, you will probably choose RestAPI, but in this
              case, the base image of the Docker image may not work properly
              unless it is published by AWS. Of course, it most likely depends
              on what you are using, but if possible, try to use an AWS image.
              Also, don't forget to set "binaryMediaType". Please check the
              repository source for details.
            </p>
          </section>
        </div>
      </section>
    </article>
  )
}

export default Home
