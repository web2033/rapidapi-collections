import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseApp = initializeApp({
  databaseURL: 'https://rapid-api-1-default-rtdb.firebaseio.com',
})

const db = getDatabase(firebaseApp)
if (location.hostname === 'localhost') {
  // Point to the RTDB emulator running on localhost.
  // db.useEmulator('localhost', 9000)
}

const FBdata = db
  .ref('data')
  .once('value')
  .then(snapshot => snapshot.val() || [])

export default FBdata
