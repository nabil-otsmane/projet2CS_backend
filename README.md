# Services of Projet 2CS
this Repo should contain services, each in its own folder.

## Requirements
you should have [docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/) installed in your machine to be able to run all services together.

## Creating a service
to create a new service, do the following:
  - copy template folder and paste with a new name for your service.
  - add this to the global docker-compose.yml file:
  ```
  <name-of-service>:
        build:
            context: ./<name-of-service>
            target: development
        volumes:
            - ./<name-of-service>:/src
            - /src/node_modules
        command: npm run start:dev
        ports:
            - "<unused-port>:8000"
        environment: 
            NODE_ENV: development
            DEBUG: src:*
  ```

now we're done with creating the service, let's go to the **usage and development** section.

## Usage
### Running all services in development mode
  - in the outer folder:
    * run `docker-compose build` to build all services together using docker compose.
    * run `docker-compose up` to run all services at the same time in development mode.

### Running only some services
in order to do that you have to start every service **manually** so :
- enter to the folder of the service you want to run
- execute `docker build -t <service-name> .`
- execute `docker run -p <port>:8000 -it <service-name>`

and we're done!

**PS: this method does not support auto reload for now. :( try searching for that yourself..**

### Happy Coding !
