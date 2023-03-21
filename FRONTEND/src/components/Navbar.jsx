import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { SearchOutlined, VideoCallOutlined } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../redux/userSlice'
import Upload from './Upload';
import axios from 'axios';
import Profile from './Profile';
const Container = styled.div`
  position:sticky;
  top:0;
  background-color: ${({theme})=>theme.bgLighter};
  height:56px;
` 
const Wrapper = styled.div`
 display:flex;
 align-items: center;
 justify-content: flex-end;
 height: 100%;
 padding : 0px 20px;
 position:relative;
`
const Search = styled.div`
 width:40%;
 position:absolute;
 left:0px;
 right:0px;
 margin:auto;
 display:flex;
 align-items:center;
 justify-content: space-between;
 padding:5px;
 border:0.5px solid gray;
 border-radius:15px;
 `
 const Input = styled.input`
 border:none;
 color:${({theme})=>theme.text};
 outline:none;
 background :transparent;
 width:100%;
`
const Button = styled.button`
 padding: 5px 15px;
 background-color : transparent;
 border : 1px solid #3eafff;
 color : #3eafff;
 border-radius : 5px;
 font-weight : 500;

 display : flex;
 align-items: center;
 gap: 5px;
 cursor:pointer;
`
const User = styled.div`
 display:flex;
 align-items: center;
 gap:10px;
 font-weight:500;
 
 color:${({theme})=>theme.text}
`
const Avatar = styled.img`
width:32px;
height:32px;
border-radius:50%;
background-color:#999
`
const Navbar = () => {
const [open,setOpen] = useState(false)
const [openProfile,setOpenProfile] = useState(false)
const [q,setQuery] = useState("")
const { currentUser } = useSelector(state=>state.user)
const navigate = useNavigate()



const [channel,setChannel] = useState({})
useEffect(()=>{
  const fetchData = async() =>{
    try{
       const channelRes = await axios.get(`/api/users/find/${currentUser._id}`)
       const {password,...others} = channelRes.data
       setChannel(others)
    }catch(err){}
  }
  fetchData()
},[channel._id])

  return (
    <>
    <Container>
      <Wrapper>
        <Search>
         <Input placeholder ="Search" onChange={e=>setQuery(e.target.value)}/>
          <SearchOutlined style={{cursor:'pointer'}} onClick={()=>navigate(`/search?q=${q}`)} />
        </Search>
       {currentUser ? (
         <User>
            <VideoCallOutlined style={{cursor:'pointer'}} onClick={()=>setOpen(true)} />
            <Avatar src={channel.img} style={{cursor:'pointer'}} onClick={()=>setOpenProfile(!openProfile)}/>
            
          </User>
       ) 
       : (<Link to="signin" style={{textDecoration:'none'}} >
        <Button>
            <AccountCircleOutlinedIcon/>
            SIGN IN</Button>
       </Link> ) }
      </Wrapper>
    </Container>
    {open && <Upload setOpen={setOpen}/>}
    {openProfile && <Profile/> }
    </> 
  )
}

export default Navbar