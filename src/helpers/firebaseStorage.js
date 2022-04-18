import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";

export const setFirestoreStorage = async (img, id) => {
  const storageRef = ref(storage, `finished-challenges/${id}`);
  const uploadTask = await uploadBytesResumable(storageRef, img);
  const url = await getDownloadURL(uploadTask.ref);
  return url;
};
