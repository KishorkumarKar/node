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

------------------------Question:-----------------
https://www.geeksforgeeks.org/node-interview-questions-and-answers/
What is REPL in NodeJS?
What do you mean by event loop in NodeJS?
What is control flow in NodeJS? 24. What is event-driven programming in NodeJS? 25. What is a buffer in NodeJS? 26. What are streams in NodeJS?
Transform Streams: 27. Explain the crypto module in NodeJS. 28. What is callback hell? 29. Explain the use of the timers module in NodeJS. 30. Difference between setImmediate() and process.nextTick() methods 44. What is a cluster in NodeJS? 60. What is an Event Emitter in Node.js?
what is option/ferflight in context of rest api
https://www.youtube.com/watch?v=tcLW5d0KAYE
what is assyncHandler or high-order-function
https://www.youtube.com/watch?v=wiOvFcvL6vQ
What is reader board or priority queue

------------------------Question:-----------------

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
        MiddleWare/errorHandler/assyncHandler or high-order-function functionality 1:00 Hr
        express-rate-limit this is use to restrict user to trigger api multiple time 1:23 Hr
        API versioning how api versioning is done 1:21
        to print all request log track 1:33:28
        error handling 1:36
        radish cache it's a remote dictionary server it's a in-memory(it's store data in memory) database 1:40
            read/write operation
            persistence it will set data for a duration
            it support multiple datastructure
            it also help us on pub/sub it enable real time communication between client
            cashing/session management
            realtime analytic

            Datastructure 1:59

            LIST ->         2.04.07
                LPUSH (it push at the beginning of the list ) RPUSH (it push at the end of the list)
                LRange retrive element form the specific range
                LPOP it will remove and retrieve first element of the list from left side
                RPOP it will remove and retrieve last element of the list from right side

            SETS -> 2:10:25
                SADD this will all one or more member to a set
                SMEMBERS -> It will return all the element of a set
                SISMember -> To check particular member exist in a set
                SREM -> remove one or more item from the set
                sorted sets -> is sorted-set each element has a score associated to it it is use on reader board or priority queue
                    ZADD -> add element with score
                    ZRANGE -> retrive renge of element
                    ZRANK -> this will give rank of element or position sorted set
                    ZREM -> remove one or more element

            Hashes 2:22:48
                HSET to set the value  this is like map.set map.value
                HGET to get the value
                HGETALL to get all the value
                HDELETE to delete

            Pub/Sub 2:27
                publisher -> send -> chanel -> subscriber will consume that
                    Publisher will send message to chanel and subscriber will consume that.

            Pipelining and transaction 2:36:53
                Pipelining is the process of sending multiple commend in a batch
                transaction is a process in which multiple command are executed as a single unit


        Microservice 2:58
