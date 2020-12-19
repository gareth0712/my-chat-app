# Decisions

Design decisions, assumptions made and any optimizations that I have done are all documented here.

## Design decisions

1. To avoid having too many code in server.js and for ease of maintenance/enhancement, I prepared the event listeners in `/listeners` folder to enhance readibility of `server.js`.
2. I name files with dash "-" as a separator instead of camelcasing to avoid errors caused by different operating systems.
3. Time, broadcast, validator, logger and handle-messages should all be modules in utils for ease of future enhancement.

## Assumptions

1. Server announcements are enclosed with '\*' and should also contain current time.
2. User can type ".exit" to exit the server.
3. If user is the first joiner, the server will notify him.
4. For sake of being "@mentioned" and maintaining readibility, nickname should not be empty or involve any special characters except "-" or "\_".
5. User can @ himself/herself for testing purpose.
6. Server announcements are not saved in the list of latest 10 messages.
7. Nicknames are enclosed with '<' and '>' for easy identification.
8. When user leaves the chat server, his nickname will be freed up for other user to take.

## Optimizations

1. Initially, I assign current time `const time = moment().format('hh:mm:ss');` and initial message `message = '< ' + time` as variable. Later, I found that I can add the current time to message directly using `messageWithTime()` function without assigning any variable.
2. I added a logger for certain server activities, for example, connect to server, disconnect from server and error.
3. I make use of Eslint and Prettier to ensure my code is up to coding standards and consistent.
4. Whenever possible, I try not to assign variable to value that is only used once and preserve readability at the same time. For example,

```
const array = [...Array(10).keys()];
array.map((i) => `Message ${Number(i + 1)}`);
```

becomes

```
const array = [...Array(10).keys()].map((i) => `Message ${Number(i + 1)}`);
```

5. I added scripts in package.json for creating Docker image for my-chat-app and running it in Docker container to ensure stability
