import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { updateProfile } from "firebase/auth";

const readFile = async () => {   

    const [fileHandle] = await window.showOpenFilePicker();

    const file = await fileHandle.getFile();

    console.log(file);

    return file;
}  


const updateUserProfile = async (user, setImgUrl) => {

    const storage = getStorage();    

    const uid = await user.id;       

    const avatarRef = await ref(storage, `avatars/${uid}/avatar`)

    const imgUrl = await getDownloadURL(avatarRef)   

    updateProfile(user, {
        profile_picture: imgUrl
    })

    setImgUrl(imgUrl);
        
}

export const uploadFile = async (user, setImgUrl) => {

    console.log("start...")

    const storage = getStorage();

    const uid = await user.id;    

    const storageRef = await ref(storage, `avatars/${uid}/avatar`)

    const img = await readFile();

    await uploadBytes(storageRef, img)

    await updateUserProfile(user, setImgUrl);  
   
}