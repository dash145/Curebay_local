### STAGE 1: Build ###
FROM node:12.14.0 AS build
ARG UI_DIR=/src
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
 
### STAGE 2: Run ###
 FROM ubuntu:latest
 ARG DEBIAN_FRONTEND=noninteractive
 RUN apt-get update
 RUN apt-get install apache2 -y
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/*
ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2
ENV APACHE_PID_FILE /var/run/apache2.pid
ENV APACHE_RUN_DIR /var/run/apache2
ENV APACHE_LOCK_DIR /var/lock/apache2
RUN mkdir -p /var/lock/apache2
COPY opt /opt
COPY etc /etc
WORKDIR /var/www/html/
copy --from=build /usr/src/app/build /var/www/html/
RUN apt-get update
RUN a2enmod rewrite
RUN service apache2 restart
EXPOSE 80
run chmod 777 /opt/bin/start-apache.sh
CMD ["/opt/bin/start-apache.sh"]

 