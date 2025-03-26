// const _ = require('lodash');
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



/**

You are a developer in a team that is building a ticket escalation system.
Tickets have different priority levels, and higher-priority tickets should be served first.

TicketQueue has these methods:

1. addTicket(ticketId: number, priority: number): void
    – Adds a ticket to the queue.

2. getNextTicket(): number | null
    – Returns the ticketId of the highest-priority ticket.If multiple tickets share the same priority, return the one added first.

3. resolveTicket(ticketId: number): void
    – Removes a ticket from the queue if it exists.

4. listTickets(): number[]
    – Lists ticket IDs in current queue order, sorted by priority and insertion order.

However, it seems like these methods are not working as expected. Tests are failing.
Debug the code and fix it so that all test cases pass. 
You are able to edit the methods (and add new ones if necessary), and the class properties.

**/


class TicketQueue {
  constructor() {
    this.queue = [];
    this.activeTickets = {};
    this.counter = 0;
  }

  addTicket(ticketId, priority) {
    this.queue.push({ priority, counter: this.counter++, ticketId });
    this.activeTickets[ticketId] = true;
    // Sort by priority first, then by counter (insertion order)
    this.queue.sort((a, b) => b.priority - a.priority || a.counter - b.counter);
  }

  getNextTicket() {
    if (this.queue.length === 0) return null;
    // Find the first active ticket
    for (let i = 0; i < this.queue.length; i++) {
      if (this.activeTickets[this.queue[i].ticketId]) {
        let ticketId = this.queue[i].ticketId;
        delete this.activeTickets[ticketId];
        this.queue.splice(i, 1);
        return ticketId;
      }
    }
    return null;
  }

  resolveTicket(ticketId) {
    delete this.activeTickets[ticketId];
    this.queue = this.queue.filter(ticket => ticket.ticketId !== ticketId);
  }

  listTickets() {
    return this.queue
      .filter(ticket => this.activeTickets[ticket.ticketId])
      .map(ticket => ticket.ticketId);
  }
}

runTests(TicketQueue);


function assertEqual(actual, expected, description) {
  const passed = JSON.stringify(actual) === JSON.stringify(expected);
  if (passed) {
    console.log(`✅ PASS: ${description}`);
  } else {
    console.log(`❌ FAIL: ${description}`);
    console.log(`   Expected:`, expected);
    console.log(`   Got     :`, actual);
  }
}

function runTests(QueueClass) {
  console.log("🚀 Running TicketQueue Tests...\n");

  const q = new QueueClass();

  q.addTicket(101, 3);
  q.addTicket(102, 1);
  q.addTicket(103, 5);
  q.addTicket(104, 2);
  q.addTicket(105, 5);

  assertEqual(q.listTickets(), [103, 105, 101, 104, 102], "Initial ticket order");

  assertEqual(q.getNextTicket(), 103, "getNextTicket() returns 103");
  assertEqual(q.getNextTicket(), 105, "getNextTicket() returns 105 (same priority)");

  q.resolveTicket(104);
  assertEqual(q.listTickets(), [101, 102], "Ticket 104 resolved and removed");

  q.addTicket(106, 10);
  assertEqual(q.listTickets(), [106, 101, 102], "High-priority ticket 106 goes to front");

  assertEqual(q.getNextTicket(), 106, "getNextTicket() returns 106");
  assertEqual(q.getNextTicket(), 101, "getNextTicket() returns 101");
  assertEqual(q.getNextTicket(), 102, "getNextTicket() returns 102");

  assertEqual(q.getNextTicket(), null, "getNextTicket() returns null when empty");

  console.log("\n✅ All tests complete.\n");
}

