# Decisions

Design decisions, assumptions made and any optimizations that I have done are all documented here.

## Design decisions

1. To avoid having too many code in server.js and for ease of maintenance/enhancement, I prepared the event listeners and helper functions in `/listeners` folder and `/utils` respectively to enhance readibility.
2. I name files with dash "-" as a separator instead of camelcasing to avoid errors causing by different operating systems.

## Assumptions

1. Server announcements are enclosed with '\*' and should also contain current time.
2. User can type ".exit" to exit the server.
3. If user is the first joiner, the server will notify him.
4. For sake of being "@mentioned" and maintaining readibility, nickname should not be empty or involve any special characters except "-" or "\_".
5. User can @ himself/herself for testing purpose.
6. Server announcements are not saved in the list of latest 10 messages.
7. Nicknames are enclosed with '<' and '>' for easy identification.

## Optimizations

1. Initially, I assign current time `const time = moment().format('hh:mm:ss');` and initial message `message = '< ' + time` as variable. Later, I found that I can add the current time to message directly using `messageWithTime()` function without assigning any variable.
2. I refractor time, broadcast, validator, logger and handle-messages to utils modules for ease of future enhancement.
3. I added a logger for certain server activities, for example, connect to server, disconnect from server and error.
