# FreyHacks
This is our code repository for our project submission for FreyHacks

## Tech Stack:
<div align="center">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="50rem" height="50rem" />
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="react" width="50rem" height="50rem" />
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/graphql/graphql-plain.svg" alt="graphql" width="50rem" height="50rem" /> 
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="python" width="50rem" height="50rem" /> 
<img src=".github/flask-original.svg" alt="flask" width="50rem" height="50rem" /> 
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/digitalocean/digitalocean-original.svg" alt="python" width="50rem" height="50rem" /> 
</div>o

## Team Members:
* Zac: Full Stack Developer and Project Leader
* Luke: Frontend and Integration Developer
* Greyson: Frontend Developer and UI Designer
* Kellan: Frontend Developer and UI Designer
* Matthew: Backend Python Developer 
* Scott: Backend Python Developer
* Hargun: DevOps Engineer

## Project Description 📝:

As the weather gets warmer and more activties become accessible, it becomes increasingly difficult to chose what to do in your past time. Our team has developed an app that can solve that problem. our carefully formulated software is capable of processing local weather data and reccommending weather dependant activities based on current and future weather conditions. Not only is the schedule capable of reccomding activities based on weather conditions, the app can also be used to plan events for you and your friends all within the app.

## Inspiration💡:

Living in Muskoka, we see alot of tourists that come from the south. A fair majority of these people have trouble knowing what weather conditions are ideal to go sailing, paddleboarding etc... Our inspiration stemmed from wanting to make an app that can aid new cottage-goers to have more fun when visiting the cottage. This idea then stemmed out to not just watersports, but other sports such as basketball and archery.


## What it does 📱:

The main objective of our app is to allow people to find the best time to do the activities they love. The app takes in your location and is able to provide a score from 0-10 based on how well the current and future weather conditions fit a certain activities.

 Another feature of our app is meant to get people together, we did this by creating "events". events are scheduled activities that people can RSVP to and do activities together. People are able to find their friends within the app through the friends section. Companies can also make use of the events section by advertising kayak tours, sports tournaments, beer leagues etc..

 Our main objective of the app is to get people active for the summer, we encourage users to do their favourite activities with or without friends at the most optimal time.


## How we built it 💻:



## Challenges we ran into 💥:

The first intial roadblock our team ran into was acquiring a suitable API. Many APIs required a key, and a majority of the time the key requries a payment. Our team then found a suitable API that was free. However, the key could not be activated till hours later. This left us unable to make any progress on the weather aspect of our code until we acquiried a working key. 

When designing a function for the event aspect of our app, we thought it would be a good idea to include a validity score. When trying to code this function, we intially realized that any event that was more than 48 hours away, we could not provide a validity report due to limitations in the API. The API can only provide an hourly report up to 48 hours. Another problem that we ran into was our API provided times in epoch time and convertering the users event date into epoch time became very time consuming, and we ended up scraping the event validity ideas.

- nested queries in graphql didn't work
- sql alchemy is refusing to have multiple subsequent queries
- most of us had never written in the language our whole job was in

## Accomplishments that we're proud of 🍀🍾:
- getting the weather api to work
- solving nested queries issue
- completely custom cidc piplines through github actions digitalocean ssh

## What we learned 🧠👍:
- Learned how to access and integrate data from an api

## What's next for Activity 🥚🐣🐥:
- Adding more activities
- Adding more paramaters to validity
- Improving UI

## Frontend
- React Native with TypeScript

## Backend
- GraphQL API in python with flask

## Hardware 
- Probably nothing is gonna happen here

## CI/CD Pipeline
- Automated by Github Actions
- Builds docker image, and pushes to Docker Hub
- Authenticates by SSH into Digital Ocean droplet linux server
- Pulls image from Docker hub into remote server and runs container
- GraphQL domain is live: sum-fun.xyz/graphql
