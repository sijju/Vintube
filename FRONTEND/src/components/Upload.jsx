import UploadIcon from '@mui/icons-material/Upload';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import app from '../utils/firebase.js'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Container = styled.div`
 width : 100%;
 height:100%;
 position : absolute;
 top:0;
 left:0;
 display:flex;
 align-items : center;
 justify-content : center;
 background-color : #000000a7;
 
`
const Wrapper = styled.div`
 width : 600px;
 height : 600px;
 background-color : ${({theme})=>theme.bgLighter};
 color : ${({theme})=>theme.text};
 padding : 20px;
 display :flex;
 flex-direction : column;
 gap:20px;
 position : relative;
`
const Close = styled.div`
 position:absolute;
 top:10px;
 right:10px;
 cursor:pointer;
`
const Title = styled.h1`
 font-size:24px;
 text-align:center;
`
const Input = styled.input`
 border: 1px solid ${({theme})=>theme.soft};
 color : ${({theme})=>theme.text};
 border-radius : 3px;
 padding : 10px;
 background-color : transparent;
`
const Desc = styled.textarea`
 border: 1px solid ${({theme})=>theme.soft};
 color : ${({theme})=>theme.text};
 border-radius : 3px;
 padding : 10px;
 background-color : transparent;
`
const Button = styled.button`
 border-radius :3px;
 border : none;
 padding:10px 20px;
 font-weight : 500;
 cursor:pointer;
 background-color : ${({theme})=>theme.soft};
 color : ${({theme})=>theme.textSoft}
`
const Label = styled.label`
 text-align : center;
 display:flex;
 flex-direction : column;
 align-items : center;
 gap:5px;
 
`
const Upload = ({setOpen}) => {
  
  const [img,setImg] = useState(undefined)
  const [video,setVideo] = useState(undefined)
  const [imgPerc,setImgPerc] = useState(0)
  const [videoPerc,setVideoPerc] = useState(0)
  const [inputs,setInputs] = useState({})
  const navigate = useNavigate()
  const [tags,setTags] = useState([])
  const handleTags = () =>{
    setTags(e.target.value.split(','))
  }
  const uploadFile = (file,urlType) =>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage,fileName)
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', 
    (snapshot) => {
   
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    urlType === 'imgUrl' ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
      default:
        break;  
    }
  }, 
  (error) => {
  
  },
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setInputs((prev)=>{
        return {...prev, [urlType]: downloadURL }
      })
    });
  }
  ) 
  }
  useEffect(()=>{
     video && uploadFile(video, "videoUrl")
  },[video])
  useEffect(()=>{
      img && uploadFile(img,"imgUrl")
  },[img])
  const handleChange =(e) =>{
    setInputs((prev)=>{
      return {...prev, [e.target.name]: e.target.value }
    })
  }
  const handleUpload = async(e) =>{
      e.preventDefault()
      const res = await axios.post(`/api/videos`,{...inputs, tags})
      setOpen(false)
      res.status === 200 && navigate(`/video/${res.data._id}`)
  }
  return (
    <Container>
        <Wrapper>
            <Close onClick={()=>setOpen(false)}>X</Close>
            <Title>Upload A Video</Title>
            <Label> Video <Label/>
             { videoPerc > 0 ? ("uploading :" + videoPerc + "%") : (
              <>
               <Input  type="file" accept='video/*' hidden onChange={e=>setVideo(e.target.files[0])}/>
               <UploadIcon style={{fontSize:'60px',borderRadius:'50%',backgroundColor:'rgba(0,0,0,0.2)',padding:'10px',cursor:'pointer'}}/>
              </>
             )} 
               
            </Label>
            <Input type="text" placeholder='Title' onChange={handleChange} name="title" />
            <Desc placeholder="Description" rows={8} onChange={handleChange} name="desc" />
            <Input type="text" placeholder="Separate Tags with Commas." onChange={handleTags}/>
            <Label>ThumbNail  <Label /> 
            {imgPerc>0 ? ("Uploading:"+imgPerc + "%") : (
            <>
            <Input type="file" accept='image/*' hidden onChange={e=>setImg(e.target.files[0])}/>
            <UploadIcon style={{
              fontSize:'60px',
              borderRadius:'50%',
              backgroundColor:'rgba(0,0,0,0.2)',
              padding:'10px',
              cursor:'pointer'
            }}/>
            </>
            )}  
              
            </Label>
            <Button onClick={handleUpload}>Upload</Button>
        </Wrapper>
    </Container>
  )
}

export default Upload