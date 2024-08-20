import { Alert, Button, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react'
import {useSelector} from 'react-redux'
import { getDownloadURL, getStorage, uploadBytesResumable,ref} from 'firebase/storage';
import {app} from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
function DashProfile() {
  const {currentUser}= useSelector(state=>state.user);
  const [imageFile,setImageFile] = useState('');
  const [imageFileUrl,setImageFileUrl]=useState('');
  const [imageFileUploadProgess,setImageFileUploadProgress]=useState(null);
  const [error,setError]=useState(null);
  const filePickerRef= useRef(null);
  const handleChange=(e)=>{
    const file=e.target.files[0];
    if(file){
      if (file.type.startsWith('image/')) {
        setImageFile(file);
        setImageFileUrl(URL.createObjectURL(file));
    } else {
        setError('Please select an image file.');
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
    }
    }
  }
  useEffect(()=>{
    if(imageFile){
    uploadImage();
    }
  },[imageFile]);
  const uploadImage=()=>{
    setError(null);
    const storage = getStorage(app);
    const fileName=new Date().getTime()+imageFile.name;
    const storageRef=ref(storage,fileName);
    const uploadTask=uploadBytesResumable(storageRef,imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot)=>{
        const progress= (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      ()=>{
        setError('Could not upload image ( File must be less than 2MB)');
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            setImageFileUrl(downloadURL);
        })
      }
    )
  }
  return (
    <div className='max-w-lg mx-auto p-3 w-full '>
      <h1 className='my-7 text-center font-semibold text-3xl'>
           Profile
      </h1>
      <form className='flex flex-col gap-4'>
        <input type='file' accept='image/*' onChange={handleChange} ref={filePickerRef} hidden/>
         <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={()=>{
          filePickerRef.current.click();
         }}>
          {imageFileUploadProgess && (
            <CircularProgressbar value={imageFileUploadProgess || 0} text={`${imageFileUploadProgess}%`} strokeWidth={5}
            styles={{
              root:{
                width:'100%',
                height:'100%',
                position:'absolute',
                top:0,
                left:0,
              },
              path:{
                stroke: `rgba(62,152,199,${imageFileUploadProgess/100})`,
              }
            }}
            />
          )}
          <img src={imageFileUrl || currentUser.profilePicture} alt='user' className={`rounded-full w-full h-full object-cover border-8 border-{lightgray} ${
            imageFileUploadProgess && imageFileUploadProgess<100 && 'opacity-60'
          } `} />
        
         </div>
           {error && (
             <Alert color='failure'>
              {error}
             </Alert>
          )}

         <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}/>
         <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email}/>
         <TextInput type='password' id='password' placeholder='password' />
         <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'> Delete Account</span>
        <span className='cursor-pointer'> Sign Out</span>
      </div>

    </div>
  )
}

export default DashProfile