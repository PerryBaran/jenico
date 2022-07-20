import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDzb4R64c1c8GJIbf8aRDXzBOB-lSvSdss",
    authDomain: "jenico-b1936.firebaseapp.com",
    projectId: "jenico-b1936",
    storageBucket: "jenico-b1936.appspot.com",
    messagingSenderId: "873325094087",
    appId: "1:873325094087:web:a521e37d3b7dadbb28cae2"
};

initializeApp(firebaseConfig);
const storage = getStorage();

const getURL = async (path: string) => {
  try {
    const fileRef = ref(storage, path);
    const url = await getDownloadURL(fileRef);
    return url
  } catch(err) {
    alert(err)
  }
};

export { getURL }