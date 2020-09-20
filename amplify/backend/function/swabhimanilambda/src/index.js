/* Amplify Params - DO NOT EDIT
	API_SWABHIMANI_GRAPHQLAPIENDPOINTOUTPUT
	API_SWABHIMANI_GRAPHQLAPIIDOUTPUT
	API_SWABHIMANI_GRAPHQLAPIKEYOUTPUT
	API_SWABHIMANI_NEWSTABLE_ARN
	API_SWABHIMANI_NEWSTABLE_NAME
	STORAGE_S3SWABHIMANISTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */
require("es6-promise").polyfill();
require("isomorphic-fetch");
const gql = require('graphql-tag');
const AWS = require('aws-sdk');
const S3 = new AWS.S3({ signatureVersion: 'v4' });

const AWSAppSyncClient = require("aws-appsync").default;
var client = new AWSAppSyncClient({
  url: process.env.API_SWABHIMANI_GRAPHQLAPIENDPOINTOUTPUT,
  region: "us-east-1",
  auth: {
    type: "API_KEY",
    apiKey: "da2-ebve35d5irexpijj7ggpqhzlri",
  },
  disableOffline: true,
});


const createNews = gql`
  mutation createNews($input: CreateNewsInput! ) {
    createNews(input: $input) {
      id
      user
      uri
      headline
      content
    }
  }
`

exports.handler = async (event) => {
  try {
    const s3Object = event.Records[0].s3;
    const bucketName = s3Object.bucket.name;
    const objectKey = s3Object.object.key;

    if(objectKey.includes("txt") ){console.log('file does not look like image or video'); return}

    const params = {
      Bucket: bucketName,
      Key: objectKey,
    };
    const data = await S3.getObject(params).promise();
    console.log('data', data)
    const metadata = (!data) ? null : data.Metadata;
    
    const textfilename = new Date().getTime().toString().concat(".txt");


    S3.putObject({
			Body: metadata.content,
			Bucket: bucketName,
			Key: "public/news/text/".concat(textfilename),
 		}).promise()
    

     const result = await client.mutate({
      mutation: createNews,
      variables: {
        input: {
          user:metadata.user,
          uri:metadata.uri,
          headline: metadata.headline,
          content: textfilename
        }
      },
      fetchPolicy: "no-cache",
    });

    const body = {
      message: event.request
    }
    return {
      statusCode: 200,
      body: JSON.stringify(body),
      headers: {
          "Access-Control-Allow-Origin": "*",
      }
    }
  } catch (err) {
    console.log('error creating todo: ', err);
  } 
}