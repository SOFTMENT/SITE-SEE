/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require('firebase-functions/v2/https');
const logger = require('firebase-functions/logger');

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {load} = require('@tensorflow/tfjs-node');
const mobilenet = require('@tensorflow-models/mobilenet');
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const sharp = require('sharp');
const crypto = require('crypto');
admin.initializeApp();
const storage = admin.storage();
const db = admin.firestore();
const axios = require('axios');
const { geohashQueryBounds } = require('geofire-common');
const { distanceBetween } = require('geofire-common');
const { uniqBy } = require('lodash');
// Load the MobileNet model
let model;

async function loadModel() {
  model = await tf.loadGraphModel(
    'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_large_100_224/feature_vector/5/default/1',
    {fromTFHub: true},
  );
}

// Hash function
function hashFeatures(features) {
  const featureString = JSON.stringify(features.dataSync());
  const hash = crypto.createHash('sha256');
  hash.update(featureString);
  return hash.digest('hex');
}
// Cloud Function to compare pHash values of two image URLs

exports.compareImagePhashes = functions.https.onCall(async (data, context) => {
  try {
    if (!model) {
      await loadModel();
    }

    const imageUrl = data.imageUrl;
    const location = data.location
    const docs = await getDocsByLocation(location)
    // Fetch and process the first image
    const imageBuffer1 = base64UrlToImageBuffer(imageUrl)
    const processedImage1 = preprocessImage(imageBuffer1);
    const features1 = model.predict(processedImage1);


    const databaseFeatures = await Promise.all(docs.map(async(doc)=>{
        const response2 = await axios.get(doc.listingImages[0], {responseType: 'arraybuffer'});
        const imageBuffer2 = Buffer.from(response2.data, 'binary');
        const processedImage2 = preprocessImage(imageBuffer2);
        const features2 = model.predict(processedImage2);
        return {...doc,feature:features2}
    }));
    // Fetch and process the second image

    const threshold = 0.95; // Adjust the threshold as needed
    const similarityArray = []
    databaseFeatures.map(val=>{
        const sim = cosineSimilarity(features1, val.feature).dataSync()[0];
        similarityArray.push({...val,sim})
    })
    similarityArray.sort((a,b)=>b.sim-a.sim)
    return {similarityArray:similarityArray.filter(item=>item.sim>=0.2)}
    // if (similarity < threshold) {
    //   console.log('The images are similar.');
    // } else {
    //   console.log('The images are not similar.');
    // }
    // return {areSimilar, similarity, features1, features2};
  } catch (error) {
    console.error('Error comparing image pHashes:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Error comparing image pHashes',
    );
  }
});
const getDocsByLocation = location => {
    return new Promise(function (resolve,reject){
    const radius = 6000
    const latitude = location.latitude
    const longitude = location.longitude
    const bounds = geohashQueryBounds([latitude, longitude], radius);
    const promises = [];
    // const collectionRef = collection(db, 'PupsForSale')
    // console.log(bounds.length)
    for (const b of bounds) {
      const query = admin.firestore()
        .collection('Listing')
        .orderBy('geohash')
        .startAt(b[0])
        .endAt(b[1]);
      promises.push(query.get());
    }
    Promise.all(promises)
      .then(snapshots => {
        //console.log(snapshots.doc)
        const matchingDocs = [];
        for (const snap of snapshots) {
            //console.log(snap.docs.length)
          for (const doc of snap.docs) {
            const lat = doc.get('location.lat');
            const lng = doc.get('location.lng');
            // We have to filter out a few false positives due to GeoHash
            // accuracy, but most will match
            const distanceInKm = distanceBetween(
              [lat, lng],
              [latitude, longitude],
            );
            //console.log(distanceInKm)
            const distanceInM = distanceInKm * 1000;
            if (distanceInM <= radius) {
              matchingDocs.push(doc);
            }
          }
        }
        return matchingDocs;
      })
      .then(matchingDocs => {
        const newArray = uniqBy(
          matchingDocs.map(doc => ({...doc.data()})),
          item => item.id,
        );
            resolve(newArray)
      })
    })
}
// Function to convert base64 URL to image buffer
function base64UrlToImageBuffer(base64Url) {
    // Remove the data URL prefix if present
    const base64String = base64Url.replace(/^data:image\/\w+;base64,/, '');
  
    // Decode the base64 string into a buffer
    const imageBuffer = Buffer.from(base64String, 'base64');
  
    return imageBuffer;
  }
// Define a function to calculate cosine similarity
function cosineSimilarity(vectorA, vectorB) {
  const dotProduct = tf.sum(tf.mul(vectorA, vectorB));
  const magnitudeA = tf.sqrt(tf.sum(tf.mul(vectorA, vectorA)));
  const magnitudeB = tf.sqrt(tf.sum(tf.mul(vectorB, vectorB)));
  return dotProduct.div(tf.mul(magnitudeA, magnitudeB));
}

// Define a function to preprocess an image
function preprocessImage(imageBuffer) {
  const image = tf.node.decodeImage(imageBuffer);

  // Resize the image to match the expected input shape (224x224)
  const resizedImage = tf.image.resizeBilinear(image, [224, 224]);

  // Expand dimensions to add a batch dimension
  const expandedImage = resizedImage.expandDims(0);

  // Normalize the image to the range [0, 1]
  const normalizedImage = expandedImage.div(255.0);

  return normalizedImage;
}
// // Function to calculate Hamming distance between two pHash values
// function calculateHammingDistance(hash1, hash2) {
//   if (hash1.length !== hash2.length) {
//     throw new Error('Hashes must have the same length');
//   }
//   let distance = 0;
//   for (let i = 0; i < hash1.length; i++) {
//     if (hash1[i] !== hash2[i]) {
//       distance++;
//     }
//   }
//   return 1 - distance / hash1.length;
// }
