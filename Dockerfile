FROM public.ecr.aws/lambda/nodejs:20 as build
#FROM node:lts-slim as build
WORKDIR /app
COPY ./app .

RUN npm install -g npm@10.6.0 && npm install && npm run build

FROM public.ecr.aws/awsguru/nginx:1.23.2023.3.11.1 as runtime
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.3 /lambda-adapter /opt/extensions/lambda-adapter

WORKDIR /var/www/html
COPY --from=build /app/dist .

COPY ./nginx/nginx.conf /opt/nginx/conf/nginx.conf
COPY ./nginx/conf.d/default.conf /opt/nginx/conf/conf.d/default.conf



EXPOSE 8080