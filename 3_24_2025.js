const _ = require('lodash');
// Your previous Plain Text content is preserved below:

// Problem Statement
// You are going to make a key-value store. In this store, keys are always strings and values are always integers. Feel free to use any built-in data structure(s) (List, Array, Map, Set, etc.) to implement your store. Your solution will need to be capable of parsing and executing these commands:

// STAGE ONE
// PUT k v
// This command should set the key (k) to hold a value (v). If the key already holds a value then it should be overwritten.
// GET k
// Get the value of the key and print it out. If the key does not exist then the command should print out "NOT FOUND".
// DEL k
// Removes the specified key from the store. If the key does not exist in the store then the command is ignored.

// STAGE TWO

// EXPIRE k s
// This command sets a key’s time-to-live (TTL) in simulated time ticks. The command operates on this set of rules:
// If the key does not exist in the database then the command should print "NOT FOUND".
// If a GET command is performed on an expired key, then "NOT FOUND" should be printed.
// If a PUT command is performed on a key with a timeout, then the timeout should be cleared.
// If an EXPIRE command is performed on an expired key, then "NOT FOUND" should be printed.
// If an EXPIRE command is performed on a non-expired key, then it should update the TTL.

// TTL k
// This command prints out the remaining time-to-live (in time ticks) of a key that has a timeout. The rules for this command are:
// If the key does not exist in the database then the command should print "NOT FOUND".
// If the key exists in the database but it does not have a timeout then the command should print "NONE".
// If the key exists in the database and it has expired then the command should print "NOT FOUND".
// The printed out value should be an integer.

// SLEEP s
// Increments the simulated time by t ticks. All other operations are instantaneous and do not increment time. 

// commands = [
//   'PUT a 10',
//   'EXPIRE a 1',
//   'TTL a',
//   'GET a',
//   'SLEEP 2',
//   'GET a',
//  ]



class MyStore {
  constructor() {
    this.store = {};
    /* 
    {key {
      value: __
      expirationTimeInSeconds: ___
    }}
    */
  }

  takeCommands(commandsArray) {
    commandsArray.forEach(commandStr => {
      let els = commandStr.split(' ');
      let command = els[0];
      let key = els[1];
      let value = els[2];
      let output;

      switch (command) {
        case 'PUT':
          this.put(key, value);
          break
        case 'GET':
          output = this.get(key);
          console.log(output)
          break
        case 'DEL':
          this.delete(key);
          break
        case 'EXPIRE':
          this.expire(key, value);
          break
        case 'TTL':
          output = this.ttl(key);
          console.log(output)
          break
      }
    })
  }
  // This command prints out the remaining time-to-live (in time ticks) of a key that has a timeout. The rules for this command are:
  // If the key does not exist in the database then the command should print "NOT FOUND".
  // If the key exists in the database but it does not have a timeout then the command should print "NONE".
  // If the key exists in the database and it has expired then the command should print "NOT FOUND".
  // The printed out value should be an integer.
  ttl(keyString) {
    let getCommandResult = this.get(keyString)
    console.log({ getCommandResult })
    if (getCommandResult === 'NOT FOUND') {
      return getCommandResult;
    } else {
      let currentTimeout = this.store[keyString]['expirationTimeInSeconds'];
      if (!currentTimeout) {
        return 'NONE'
      } else {
        let now = new Date();
        if (now > currentTimeout) {
          return currentTimeout;
        } else {
          'NOT FOUND';
        }
      }
    }
  }

  expire(keyString, expirationTimeInSeconds) {
    let now = new Date();
    let expirationTime = new Date();
    expirationTime.setSeconds(expirationTime.getSeconds() + expirationTimeInSeconds);
    console.log({ now })
    console.log({ expirationTime })

    let getCommandResult = this.get(keyString)
    console.log({ getCommandResult })
    if (getCommandResult === 'NOT FOUND') {
      return getCommandResult;
    } else {
      let currentExpirationTime = this.store[keyString]['expirationTimeInSeconds'];

      if (currentExpirationTime && currentExpirationTime < expirationTime) {
        return 'NOT FOUND';
      } else {
        console.log(`Setting expiration time: ${expirationTime}`)
        this.store[keyString]['expirationTimeInSeconds'] = expirationTime
      }
    }
  }

  put(keyString, valueInteger) {
    this.store[keyString] = {
      "value": valueInteger
    };
  }

  get(keyString) {
    let keyPresent = this.store[keyString]
    let now = new Date();
    // if key is expired also not found:
    // return keyPresent
    console.log(this.store[keyString])

    return keyPresent && now > keyPresent['expirationTimeInSeconds'] ? keyPresent['value'] : 'NOT FOUND';
  }

  delete(keyString) {
    delete this.store[keyString];
  }
}

let newStore = new MyStore();

// Sample input:
// let commands = [
//   'PUT a 10',
//   'GET a',
//   'DEL a',
//   'GET a',
// ]

// OUTPUT
//  10
//  NOT FOUND

let commands = [
  'PUT a 10',
  'EXPIRE a 100',
  'TTL a',
  // 'GET a',
]

newStore.takeCommands(commands)