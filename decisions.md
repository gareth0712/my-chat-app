# Decisions

Design decisions, assumptions made and any optimizations that I have done are all documented here.

## Design decisions

1. To avoid having too many code in server.js, I prepare the listeners in `/listeners` folder and import them to server.js to enhance readibility.
2. I place all helper functions to `/utils` to .
3. I name files with dash "-" as a separator instead of camelcasing to avoid errors causing by different operating systems.

## Assumptions

1. There should be logger for certain server activities, for example, connect to server, disconnect from server and error.
2. User can type ".exit" to exit the server.

## Optimizations

1. I try to refractor the modules to utils and listeners by exporting to enhance readibility and ease of maintenance/enhancement .
2.
