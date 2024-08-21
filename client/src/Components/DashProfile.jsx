import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react'
import {useSelector} from 'react-redux'
import { getDownloadURL, getStorage, uploadBytesResumable,ref} from 'firebase/storage';
import {app} from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {updateStart,updateSuccess,updateFailure} from '../redux/User/UserSlice';
import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { deleteUserStart, deleteUserFailure, deleteUserSuccess,signOutSuccess } from '../redux/User/UserSlice';
function DashProfile() {
  const {currentUser , err }= useSelector(state=>state.user);
  const [imageFile,setImageFile] = useState('');
  const [imageFileUrl,setImageFileUrl]=useState('');
  const [imageFileUploadProgess,setImageFileUploadProgress]=useState(null);
  const [imageFileUploading,setImageFileUploading]=useState(false);
  const [ updatedUser,setUpdatedUser]=useState(null);
  const [updateUserError,setUpdateUserError]=useState(null);
  const [formData,setFormData]=useState({});
  const [showModal, setShowModal] = useState(false);
  const [error,setError]=useState(null);
  const filePickerRef= useRef(null);
  const dispatch= useDispatch();
  const handleSignOut = async()=>{
    try{
      const res = await fetch('/api/user/signout',{
        method:'POST',
      })
      const data = res.json();
      if(!res.ok){
          console.log(data.message);
      }
      else{
           dispatch(signOutSuccess());
      }
    }
    catch(err){
      console.log(err);
    }
  }
  const handleInputChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value.trim()
    })
  }
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
  const handleDeleteUser= async()=>{
      setShowModal(false);
      try{
         dispatch(deleteUserStart());
         const res = await fetch(`/api/user/delete/${currentUser._id}`,{
            method:'DELETE',
         })
         const data = res.json();
         if(!res.ok){
           dispatch(deleteUserFailure(data.message));
         }
         else{
           dispatch(deleteUserSuccess());
         }
      }
      catch(err){
         dispatch(deleteUserFailure(err));
      }
  }
  useEffect(()=>{
    if(imageFile){
    uploadImage();
    }
  },[imageFile]);
  const uploadImage=()=>{
    setImageFileUploading(true);
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
        setImageFileUploading(false);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            setImageFileUrl(downloadURL);
            setFormData({...formData,profilePicture:downloadURL});
            setImageFileUploading(false);
        })
      }
    )
  }
  
   const handleSubmit= async (e)=>{
    e.preventDefault();
    setUpdateUserError(null);
    setUpdatedUser(null);
    if(Object.keys(formData).length===0){
      setUpdateUserError('Please update at least one field');
      return;
    }
    if(imageFileUploading){
      setUpdateUserError('Please wait for image to upload');
      return; 
    }
    try{
         dispatch(updateStart());
         const res = await fetch(`/api/user/update/${currentUser._id}`,{
          method:'PUT',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(formData)
         });
         const data = await res.json();
         if(!res.ok){
          dispatch(updateFailure(data.message));
          setUpdateUserError(data.message);
         }
         else{
          dispatch(updateSuccess(data));
          setUpdatedUser("User's Profile Updated Successfully");
         }
    }
    catch(err){
          dispatch(updateFailure(err.message));
          setUpdateUserError(err.message);
    }
   }
  return (
    <div className='max-w-lg mx-auto p-3 w-full '>
      <h1 className='my-7 text-center font-semibold text-3xl'>
           Profile
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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

         <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleInputChange}/>
         <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email}onChange={handleInputChange}/>
         <TextInput type='password' id='password' placeholder='password' onChange={handleInputChange}/>
         
         <Button type='submit' gradientDuoTone='purpleToBlue' outline >Update</Button>

      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer' onClick={()=>setShowModal(true)}> Delete Account</span>
        <span className='cursor-pointer' onClick={handleSignOut}> Sign Out</span>
      </div>
      {updatedUser && (
        <Alert color='success' className='mt-5'>
          {updatedUser}
        </Alert>
      )}
      {
        updateUserError && (
          <Alert color='failure' className='mt-5'>
            {updateUserError}
          </Alert>
        )
      }
      {err && (
        <Alert color='failure' className='mt-5'>
          {err}
        </Alert>
      )}
     <Modal show = {showModal} onClose={()=>setShowModal(false)} popup size='medium'>
      <Modal.Header />
      <Modal.Body>
        <div className='text-center'>
          <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
          <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'> Are you Sure you want to delete your account ?</h3>
          <div className='flex justify-center gap-4'>
            <Button color = 'failure' onClick={handleDeleteUser}>
              Yes I'm Sure !
            </Button>
            <Button color='gray' onClick={()=>setShowModal(false)}>
              No,Cancel
            </Button>
          </div>

        </div>
      </Modal.Body>
     </Modal>
    </div>
  )
}

export default DashProfile