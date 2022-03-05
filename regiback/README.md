# dev log

decision tracker:

decided to have seperate server for front end and socket.io server for 2 reasons:

1. Better ability to scale in the future, should I want to serve more users having the backend seperate now will make it easier.
2. Laziness / cleaner code. This way I can just run npx create-next-app in regifront and have a seperate node instance for the socket.io server. Dont have to configure anything with express

A problem arose RE: rooms and game state, trying to make sure the array of games agrees with socket / room state

at the moment a new game / room is instantiated when a request-create-room event is emitted to the server and the game is deleted when the underlying adapter object emits a destroy-room event, as the application grows might need to create an api on top that handles room / game creation + destruction

Running into an annoying typescript compiler error when trying to iterate over an enum, typing is not preserved it seems due to the way an enum compiles into .js