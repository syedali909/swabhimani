/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	ANALYTICS_SWABHIMANIANALYTICS_ID
	ANALYTICS_SWABHIMANIANALYTICS_REGION
	API_SWABHIMANI_GRAPHQLAPIENDPOINTOUTPUT
	API_SWABHIMANI_GRAPHQLAPIIDOUTPUT
	API_SWABHIMANI_GRAPHQLAPIKEYOUTPUT
	API_SWABHIMANI_NEWSTABLE_ARN
	API_SWABHIMANI_NEWSTABLE_NAME
	AUTH_SWABHIMANID7ABAEC6_USERPOOLID
	FUNCTION_SWABHIMANILAMBDA_NAME
	STORAGE_S3SWABHIMANISTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */

require("es6-promise").polyfill();
require("isomorphic-fetch");
var express = require("express");
var bodyParser = require("body-parser");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const AWS = require("aws-sdk");
const AWSAppSyncClient = require("aws-appsync").default;
const AUTH_TYPE = require("aws-appsync").AUTH_TYPE;
const gql = require("graphql-tag");
var client = new AWSAppSyncClient({
  url: process.env.API_SWABHIMANI_GRAPHQLAPIENDPOINTOUTPUT,
  region: "us-east-1",
  auth: {
    type: "API_KEY",
    apiKey: "da2-ebve35d5irexpijj7ggpqhzlri",
  },
  disableOffline: true,
});
const S3 = new AWS.S3({ signatureVersion: "v4" });
const uuidv4 = require("uuid/v4");

// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
/**********************
 * Example get method *
 **********************/
app.get("/news", async (req, res) => {
  const listnews = gql`
    ${req.headers.query}
  `;
  console.log("req come as a ", listnews);

  const result = await client.query({ query: listnews });
  console.log("result", result);
  res.json({
    news: result,
  });
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
