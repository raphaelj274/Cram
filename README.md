# Cram

Ed-tech App leveraging AI & OCR to help students move past breakpoints. Currently configured to help developers learn new technologies, however, I'm working on allowing teachers to upload specific material relevant to each student's curriculum.

## **Features**

Currently, Cram allows developers to take a photo of any problem they are struggling with, whether that be a photo of the code they are working on or the docs themselves. Cram will then process the image, sort the problem and return specific content based on the photo taken. For example, if a developer is setting up an express server, and its not working for whatever reason, they can take a photo of their code, hit cram, and cram will return a youtube video, a dedicated cheatsheet and allows users to navigate to other relevant topics that may help the developer. Try it out!

## **Demo**

<img src="/assets/demo3.gif" alt="Cram App Demo"/>

## **Tech Stack**

A combination of React-Native with Expo has been used to build the user interface. While on the backend the app leverages GraphQL with ApolloClient to make queries to a seeded NoSQL database containing information on each topic.

### **Front end**

- React-Native </br>
- Expo </br>
- 'Typescript' </br>
- ApolloClient </br>

### **Back end**

- ApolloServer </br>
- GraphQL </br>
- Typescript </br>
- Google Cloud Platform (Vision API) </br>
- MongoDB </br>
- Mongoose </br>

## **System Requirements**

NodeJS v15 or greater
Npm v7.5 or greater

## **Getting Started**

To get up and running it’s first necessary to install all dependencies. This will install both the client and server dependencies for you.

- `git clone https://github.com/raphaelj274/cram` </br>
- ` cd cram && npm i` </br>

### **Setting up the backend**

#### **Seeding the database**

As mentioned the backend works off of a seeded database. This is a script available in the backend. So from the server directory, run:

- `npm run seed` </br>

#### **Google Vision ApiKey**

The image processing is handled by Google’s Vision API. To get this working you will have to register an account with google and obtain an apiKey. Once acquired you will have to create an apiKey.json file in the scr folder of the server to store it in.

#### **Environment variables**

PORT is the only environment variable needed on the backend. Create a .env file in the server folder and store your port number there. See `.env.example`.

#### **Running the server**

- `npm run start-dev` </br>

Once all the other steps have been completed, from the src folder run

- `node index.js` </br>

or, if nodemon is installed (recommended)

- `npm run start dev`

### **Setting up the frontend**

#### **Environment variables**

There are two environment variables to set up on the frontend: APOLLOCLIENT_HOST and APOLLOCLIENT_PORT. </br>
You can run `ipconfig getifaddr en0` in the terminal to find out your IP address. See `.env.example`.

#### **Running the client**

- `npm run start`
