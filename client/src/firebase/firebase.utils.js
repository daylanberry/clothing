import firebase from 'firebase/app'
//database
import 'firebase/firestore';
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyAkfCustv-z8X9hmSE8oJFydk4aEq_pi2A",
  authDomain: "trans-array-253223.firebaseapp.com",
  databaseURL: "https://trans-array-253223.firebaseio.com",
  projectId: "trans-array-253223",
  storageBucket: "trans-array-253223.appspot.com",
  messagingSenderId: "647533815474",
  appId: "1:647533815474:web:da183ff54e071691b8cbab",
  measurementId: "G-RP7PEME805"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        items: [],
        ...additionalData

      })

    } catch (error) {
      console.log('error creating user', error.message)
    }
  }
  return userRef

}

export const getUserCartRef = async (id) => {
  const cartsRef = firestore.collection('carts').where('id', '==', id)
  const snapShot = await cartsRef.get();

  if (snapShot.empty) {
    const cartDocRef = firestore.collection('carts').doc();
    await cartDocRef.set({id, cartItems: []});
    return cartDocRef;
  } else {
    return snapShot.docs[0].ref
  }
}



export const addCollectionAndDocuments = (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch()
  objectsToAdd.forEach(obj => {
    //to get a new document and to randomly get an id
    const newDocRef = collectionRef.doc()
    batch.set(newDocRef, obj)
  })
  //fires batch request, returns a promise
  return batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformed = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })

  return transformed.reduce((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection
    return acc
  }, {})
}


firebase.initializeApp(config)

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe()
      resolve(userAuth)
    }, reject)
  })
}

//have access to this do to import auth
export const auth = firebase.auth()
export const firestore = firebase.firestore()

export const googleProvider = new firebase.auth.GoogleAuthProvider();


//want to always trigger google popup whenever we use google auth provider
//googleProvider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase;