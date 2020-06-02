# Repos Checker [in progress]

![Repos Checker Demo](/repos-checker-demo.gif)

A react app communicating with GraphQL API v4 of GitHub.

User can query a specific github repository, the app will display the pull requests, open and closed issues of the repository with pagination.

It is a project to learn GraphQL, typesScript and deployment with the use of terraform.

## What I have achieved...

1. learned the use and concepts of **GraphQL**;
2. created **useFetch** custom hook to reuse the data fetching and fetch-more logic;
3. implement **pagination**

## More to do...

1. **Learning TypeScript by adding TypeScript to the project**

Some variables are still in any type;
need to map the JSON data from API to TypeScript;
and need to organise the interface in a more reusable way

2. **Deployment**

learning deployment to AWS EC2 with the use of terraform is one of the learning objective.

## Prerequisites

1. In order to communicate with the GraphQL server, make sure you have an [`Github OAuth token`](https://developer.github.com/v4/).

2. Make sure you have [`Docker (Version: >=17.05)`](https://www.docker.com/) and [`Docker Compose`](https://docs.docker.com/compose/) installed.

## Run Locally for Development

1. Clone the repository:

```
git clone https://github.com/shanwong29/repos-checker-2.0.git
```

2. Add your `Github API Key` as an environment variables:

```
export GITHUB_API_KEY=<Your Github API Key>
```

3. Build Docker images and run the Docker containers:

```
cd repos-checker-2.0/
docker-compose up --build
```

The Node app conatiner can be accessed by [http://localhost:5000](http://localhost:5000),
while the react app container can be accessed by [http://localhost:3000](http://localhost:3000).

Every edit in `src/` and `public/` will automatically be reflected in the apps running in containers.

## Built with

- React.js
- Node.js
- Express.js
- CSS Modules
- [GraphQL API v4](https://developer.github.com/v4/)
- TypeScript
