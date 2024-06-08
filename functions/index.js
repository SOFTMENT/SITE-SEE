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
const serviceAccount = {
  "type": "service_account",
  "project_id": "site-see-32c16",
  "private_key_id": "5c1943538feb9b4d236df63f74d087ebbeea713a",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyQeLIqlNuGY5H\nY1vxryqGfMbd4p68UpkpKG1MMpDsru7ycGUT3D2CzHPxqzatN2Gi1ss+jqVdDWvq\nTNNWi0D/KVPbY3kMf46xW44Y6Ev+evUzO7A3jrO+WjSH6xPd1py785BE/vVHmqvt\nkh+E5fqasiuimPkvKXiiJApzIwNhzWCY7GBqU1KIOpO4mUDQ0FAQCudDodkrTST/\nLt28iYHmmbWB9aeeaM/rCGrz6M+Lh9dKITf3ZnWNpYnN4mN5EMRI9jhVcKpKaFyr\n1N0bpfjmej1xOkzqX+HJad/2QCcjmTTlSGWGanmdKvIfS2XXFcTpR8D05kxqW1CG\naeICJo2lAgMBAAECggEAA6x6nArGmrz0GGHigeH2TRHtQfgVsBPpDCwadI47kQ/Z\n5NfkKBCgmT2AIORCcDd1T6yAQSh3cqoq0IgHeFUjtcky7Tvo7BUE6oAp4YwyuhVB\nUG5T0hFNgF145QQ3Q0R/s8VFR+a+mgcvW+oTCY4j0rmxTzHlO3pDU4l38v+EZlOT\nHGXALzBdQs2ewe/YPzMgpAbIp2YggdEm3tdW0wM2rePfaszJBy/mJGLSkwbKv5ZO\npuvAHJIehSYF6gG27ZgsvnO+Ivg2r7RlFz/toSIDARybcVuXHgDdUjLpYO9oP2Nu\nm5UNKyF8f0CJ69HERvcFuY7ArBOgHrwlviG9OKf1UQKBgQDboUeVwgZ+wdV12pLr\nFA1EJKMjNkFYvQrryDxBysh2fERmwNHXWyKqOI/a2io1tCNGwCgxrumV/Bd1mdSr\nP4yvxhrtPEEQzxQO5fjXLApQ5wIJpfGSPKvTbt6xANVApzdc+fze3BP/Abl9HxoM\nz7Q0DTWwNAF1ub7vv4MPPsh7DwKBgQDPxrTa5+FWlhX5Tr9p4geP/znlP+Xz7pN3\novGJDOnqmyEAKLbtE9c0zlbla54rdaUWf2intPwpP1Hblu94KoXpTfJueERC0OvI\nJ3eHYKO3lGRireZVSmPSIeQ4Fd5rY61HjZo7EbNLtwuksim/fgl9ixyCcbzfVxlh\nm8kgJTJ8CwKBgHthDqXCaYOrwA6EyyPkD8/IBR0yzWLcT9ZElhUfpZ1qEcLnbvpb\n6A1X2PhIto2UtHx6VhoS+IWZKFSYJjBNcusLjvTWdHbM3afA6Rl3VBQ+sZZZ8msE\nSkJsdg1ZOnMnfKJujO9lEpaekWUIo8mupLzY7uAdVvSbc/eazjUyP81hAoGBALNu\nEjkJDpxLuGY4Dy1NOOKtsj271MW3PjqOyK9mK4uis/kDMBXEkJDVsE0nhsxZKFwp\nYyORNEIaoIJV8i9/6Wz1F2s3CRv6d+O90YdjeX7L83UUYFk/iLyq7/9PQ2jSB45H\nRu3D92ZniPKNuWfZXDDCtbggqM7m1NBqTGIqPVLJAoGAOzh8uZYoD51SlFvAXN3u\n4iHyjNZ6ITsM3KBmpSQ1FZLdPlZ/X06mdeCIBlZR30RneZVWg95+r0PglXwN0T8o\nLigB+3gm8tMPVnOt6CiVEIb0zwW8oxHPsaVl4lZjLgrmD6w9ovjzHhTAJTUTee8A\nosXFaiRwZBg1V+iBy72qaAk=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-gs3s9@site-see-32c16.iam.gserviceaccount.com",
  "client_id": "115613708109334042536",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gs3s9%40site-see-32c16.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const storage = admin.storage().bucket('gs://site-see-32c16.appspot.com');
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

exports.compareIfListingAlreadyExists = functions
.runWith({ memory: '8GB' })
.https.onCall(async (data, context) => {
  try {
    if (!model) {
      await loadModel();
    }

    const imageUrl = data.imageUrl;
    const supplierId = data.supplierId;
    const res = await admin.firestore()
      .collection("Listing")
      .where("supplierId", "==", supplierId)
      .get();
    const docs = res.docs;

    // Process the new image
    const imageBuffer1 = base64UrlToImageBuffer(imageUrl);
    const processedImage1 = preprocessImage(imageBuffer1);
    const features1 = model.predict(processedImage1);

    const threshold = 0.95; // Adjust the threshold as needed

    for (const doc of docs) {
      try {
        const listingImageURL = doc.data().listingImages[0];
        const response2 = await axios.get(listingImageURL, { responseType: 'arraybuffer' });
        const imageBuffer2 = Buffer.from(response2.data, 'binary');
        const processedImage2 = preprocessImage(imageBuffer2);
        const features2 = model.predict(processedImage2);

        const sim = cosineSimilarity(features1, features2).dataSync()[0];
        console.log(sim+" ",listingImageURL)
        if (sim >= 0.3) {
          console.log(listingImageURL)
          return {status:1}; // Images are similar, return 1
        }
      } catch (error) {
        console.error(`Error downloading image for listing ${doc.id}:`, error);
      }
    }

    return {status:0}; // No similar images found, return 0
  } catch (error) {
    console.error('Error comparing image pHashes:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Error comparing image pHashes',
    );
  }
});

exports.compareImagePhashes = functions
.runWith({ memory: '8GB' })
.https.onCall(async (data, context) => {
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
    const radius = 60
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
exports.handleUserDelete = functions.https.onCall(async (data, context) => {
  const uid = context.auth.uid;

  try {
      const doc = await admin.firestore().collection('Suppliers').doc(uid).get();

      await admin.firestore().collection('Users').doc(uid).delete();

      if (!doc.exists) {
          await admin.auth().deleteUser(uid);
      }
      deleteSubcolletions("Users","Favorites",uid)
      deleteSubcolletions("Users","SearchHistory",uid)
      deleteAllMessage(uid)
      return { success: true, message: 'Account Deleted!' };
  } catch (error) {
      return { success: false, message: error.message };
  }
});

exports.handleSupplierDelete = functions.https.onCall(async (data, context) => {
  const uid = context.auth.uid;

  try {
      const doc = await admin.firestore().collection('Users').doc(uid).get();

     

      await admin.firestore().collection('Suppliers').doc(uid).delete();

      if (!doc.exists) {
          await admin.auth().deleteUser(uid);
      }
       // Placeholder for the deleteListingsAndImages function.
      // Implement the deleteListingsAndImages function as needed.
      deleteSubcolletions("Suppliers","Questions",uid)
      deleteListingsAndImages(uid);
      deleteAllMessage(uid)
      return { success: true, message: 'Account Deleted!' };
  } catch (error) {
      return { success: false, message: error.message };
  }
});
// Delete listings and images function
async function deleteListingsAndImages(uid) {
  const listingCollection = await admin.firestore()
      .collection('Listing')
      .where('supplierId', '==', uid)
      .get();
  listingCollection.docs.forEach(doc => {
      const data = doc.data();
      const listingImages = data.listingImages || [];

      listingImages.forEach((image, index) => {
          const storageRef = storage.file(`ListingImage/${doc.id}_${index + 1}.png`);
          storageRef.delete()
      });
      firestore.collection('Listing').doc(doc.id).delete()
  });

  await Promise.all(deletePromises);
}
async function deleteSubcolletions(collection,subcollection,uid){
  const docs = await admin.firestore().collection(collection).doc(uid)
      .collection(subcollection)
      .get()
      docs.docs.map(doc=>{
         admin.firestore().collection(collection).doc(uid)
         .collection(subcollection)
         .doc(doc.id)
         .delete()
      })
}
const deleteAllMessage = async(uid) => {
  const lastMessages = await admin.firestore().collection("Chats").doc(uid)
  .collection("LastMessage")
  .get()
  const allChatsDocIds = []
  lastMessages.docs.map(doc=>{
    allChatsDocIds.push(doc.id)
    admin.firestore().collection("Chats").doc(uid)
    .collection("LastMessage")
    .doc(doc.id)
    .delete()
  })
  const promises = []
  allChatsDocIds.map(id=>{
    
   promises.push( admin.firestore().collection("Chats").doc(uid)
   .collection(id)
   .get())
  })
  const snapshots = await Promise.all(promises);
 // Collect promises for deleting all chat documents
 const deleteChatDocsPromises = snapshots.flatMap((snap, index) => {
  return snap.docs.map(doc => {
    return admin.firestore().collection("Chats").doc(uid)
      .collection(allChatsDocIds[index])
      .doc(doc.id)
      .delete();
    });
  });
await Promise.all(deleteChatDocsPromises);
}
// subChats.docs.map(doc=>{
//   admin.firestore().collection("Chats").doc(uid)
//   .collection()
//   .doc(doc.id)
//   .delete()
// })