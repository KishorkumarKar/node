Step 1: Initialize Project

mkdir ts-node-server && cd ts-node-server
npm init -y
npm install express
npm install --save-dev typescript ts-node @types/node @types/express

to generate js file
https://www.bacancytechnology.com/qanda/node/watch-and-reload-ts-node-when-typescript-files-change

GIT:-
Types script:-
Git new type script change:-
https://github.com/fifocode/nodejs-backend-architecture-typescript/tree/main
MERN TypeScript Food Ordering App
https://github.com/Rakesh-99/restaurant-management-and-food-ordering-platform/tree/master
Normal:-
Source code of Food order website built with MongoDB, Express, React JS and Node JS
https://github.com/aayushai/Hangry/tree/main
https://github.com/ayushnighoskar/FoodDeliveryApp

Node validation:-
https://www.youtube.com/watch?v=QR-oi1PCaZk

Question:-
https://www.geeksforgeeks.org/node-interview-questions-and-answers/
What is REPL in NodeJS?
What do you mean by event loop in NodeJS?
What is control flow in NodeJS? 24. What is event-driven programming in NodeJS? 25. What is a buffer in NodeJS? 26. What are streams in NodeJS?
Transform Streams: 27. Explain the crypto module in NodeJS. 28. What is callback hell? 29. Explain the use of the timers module in NodeJS. 30. Difference between setImmediate() and process.nextTick() methods 44. What is a cluster in NodeJS? 60. What is an Event Emitter in Node.js?

https://www.youtube.com/watch?v=_f7h6xQXiLA&list=LL&index=4&t=1126s
section 1
how event loop works

            1. timers
                Execute the callbacks schedule by set-time-out or set-interval
                    After that it run all pending call back
                    After that ideal and prepare
                    after that pool which retrieve new input out put events
                    After that CHECK set immediate call back
                    Then close callback
            2.Microtask which execute immediately after the current operation complete
                EX:- process.nextTick, promises , object.observe
            2. Macrotask it execute on next iteration of event loop
                Ex:- setTimeOut, SetImmediate, setImmediate, Input/output operation(Like file read)

            Phase of execution :-
                timers -> pending callback -> ideal , prepare (this is handle by node) -> poll -> check -> close callback

        buffers
            It's use for handel binary data
                Ex:- Uploading file, image and also in case of cryptography
        what is concepts of streams and worker threads
            there is 4 type of streams 35:00
                writable
                readable
                duplex -> for both read and write
                transform ->

        Cors  this is use to configure cross origin  45:00
