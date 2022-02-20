# dev log

decision tracker:

decided to have seperate server for front end and socket.io server for 2 reasons:

1. Better ability to scale in the future, should I want to serve more users having the backend seperate now will make it easier.
2. Laziness / cleaner code. This way I can just run npx create-next-app in regifront and have a seperate node instance for the socket.io server. Dont have to configure anything with express