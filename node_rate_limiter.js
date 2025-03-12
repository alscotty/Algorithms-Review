import { Router } from "express";
import * as widgetsService from "./services/widgetsService.js";

// req.method = [ts] limit 3 req/sec
// global = [ts] limit 100/min  
// newer timestamps will be at the front
let apiTimestamps = {};

const checkRateLimit = (req, res, next) => {
  // check, save timestamps of requests, fixed window strategy
  let currentTimestamp = new Date();
  let requestUrl = req.originalUrl;
  console.log({ requestUrl })
  console.log({ apiTimestamps })

  let globalTs = apiTimestamps["global"];

  if (apiTimestamps[requestUrl] == undefined) {
    apiTimestamps[requestUrl] = [currentTimestamp]
    apiTimestamps["global"] = [currentTimestamp]
    next();
  } else {
    // checking per endpoint
    let lastEndpointTimestamps = apiTimestamps[requestUrl];
    let previousSec = new Date(currentTimestamp.getTime() - 1000);
    let previousMin = new Date(currentTimestamp.getTime() - 60000);

    let recentSecTimestamps = lastEndpointTimestamps.filter(ts => ts >= previousSec);
    let recentMinTimestamps = lastEndpointTimestamps.filter(ts => ts >= previousMin);

    if (recentSecTimestamps.length >= 3) {
      res.status(429).send("Too Many Requests")
    } else {

      if (recentMinTimestamps.length >= 100) {
        res.status(429).send("Too Many Requests");
      } else {
        apiTimestamps[requestUrl] = [currentTimestamp, ...lastEndpointTimestamps]
        apiTimestamps["global"] = [currentTimestamp,
          ...globalTs];
        next();
      }

    }

  }
}


function createRouter() {
  const router = Router();

  // variables that should be reset with every test should be placed here



  // respond with "hello world" when a GET request is made to the homepage
  router.get("/", checkRateLimit, async (req, res) => {
    console.log(`Request to: ${req.method} ${req.path}`); // <--- How to get URL
    res.status(200).send("hello");
  });

  router.get("/error", checkRateLimit, async (req, res) => {
    res.status(418).send("I'm a teapot");
  });

  router.post("/widgets", checkRateLimit, async (req, res) => {
    const newWidget = await widgetsService.createWidget();
    res.status(200).send(newWidget);
  });

  router.get("/widgets", checkRateLimit, async (req, res) => {
    const widgets = await widgetsService.getAllWidgets();
    res.status(200).send(widgets);
  });
  return router;
}

export { createRouter };
