import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import {getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const handleFileUpload= async()=>{
      try{
          if(!file) {
             setImageUploadError('Please select a Image');
             return;
          }
          setImageUploadError(null); 
          const storage = getStorage(app);
          const fileName = new Date().getTime()+'-'+file.name;
          const storeageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storeageRef, file);
          uploadTask.on('state_changed', (snapshot)=>{
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          
              setImageUploadProgress(progress.toFixed(0));
              
             
          },
          (error)=>{
             setImageUploadError('Image Upload Failed');
             setImageUploadProgress(null);
          },
          ()=>{
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                setImageUploadError(null);
                setImageUploadProgress(null);
                setFormData({...formData, imageUrl: downloadURL});
              }
              )
          }

        )
      }
      catch(error){
         setImageUploadError('Image Upload Failed');
         setImageUploadProgress(null);
      }

  }
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl font-semibold my-7'>Create a Post</h1>
        <form  className='flex flex-col gap-4'>
             <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput type='text' placeholder='Title' required id='title' className='flex-1' />
                <Select >
                    <option value = "uncategoraized">Select a category</option> 
                    <option value = "javascript">Javascript</option>
                    <option value = "react">React</option>
                    <option value = "node">Node</option>
                    <option value = "Next">Next</option>
                    </Select> 
             </div>
              <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                <FileInput type='file' accept='image/*' onChange={(e)=>setFile(e.target.files[0])}/>
                <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline onClick={handleFileUpload} disabled={
                  imageUploadProgress 
                }>
                  {
                    imageUploadProgress ? 
                    <div className='w-16 h-16'>
                      <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                    </div>
                    : 'Upload Image'
                  }
                </Button>
              </div>
              {imageUploadError && <Alert type='failure'>{imageUploadError}</Alert>}
              { formData.imageUrl && <img src={formData.imageUrl} alt='preview' className='w-full h-72 '/>}
              <ReactQuill theme='snow' placeholder='Write something amazing...' className='h-72 mb-12' required />
              <Button type='submit' gradientDuoTone='purpleToPink' >Publish</Button>
        </form>
    </div>
  )
}

export default CreatePost