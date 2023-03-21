import React, { useState,useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {format} from 'timeago.js'
import axios from 'axios'
const Container = styled.div`
 width:${(props)=>props.type !== 'sm' && '360px'};
 margin-bottom:${(props)=>props.type === 'sm' ? '10px' : '45px'};
 cursor:pointer;
 display:${(props)=>props.type === 'sm' && 'flex'};
 gap:10px;
 
`
const Image = styled.img`
 width:100%;
 height:${(props)=>props.type === 'sm' ? '130px' : '202px'};;
 background-color:#999;
 flex:1;
 border-radius :10px;
`
const Details = styled.div`
 display:flex;
 margin-top:${(props)=>props.type === 'sm' ?'16px' : '10px'};
 gap:12px;
 flex:1;
`
const ChannelImg = styled.img`
 width:36px;
 height:36px;
 border-radius:50%;
 background-color:#999;
 display : ${(props)=>props.type === 'sm' && 'none'};
`
const VideoDetails = styled.div`
 
`
const Title = styled.h1`
 font-size:15px;
 font-weight:600;
 color: ${({theme})=>theme.text}
`
const Channel = styled.h2`
 font-size:13px;
 color : ${({theme})=>theme.textSoft};
 margin:9px 0px;
 font-weight:500;
`
const Info = styled.div`
 font-size:13px;
 color : ${({theme})=>theme.textSoft};
`

const Card = ({type,video}) => {
  const [channel,setChannel] = useState({})

  useEffect(()=>{
     const fetchChannel = async() => {
      const res = await axios.get(`/api/users/find/${video.userId}`)
      
      setChannel(res.data)
     }
     fetchChannel()
  },[video.userId])
  
  return (
   <Link to={`/video/${video._id}`} style={{textDecoration:"none"}}>
    <Container type={type}>
      <Image type={type} src={video.imgUrl} />
      <Details type={type}>
      <ChannelImg type={type} src={channel.img} />
      <VideoDetails>
         <Title>{video.title}</Title>
         <Channel>{channel.name}</Channel>
         <Info>{video.views} views {format(video.createdAt)}</Info>
      </VideoDetails>
      </Details>
    </Container>
   </Link> 
  )
}

export default Card