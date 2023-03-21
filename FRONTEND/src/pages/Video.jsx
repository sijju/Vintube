import { DownloadOutlined, ReplyOutlined, ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Comments from '../components/Comments'
import Card from '../components/Card'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { dislike, fetchSuccess, like } from '../redux/videoSlice'
import { format } from 'timeago.js'
import { subscription } from '../redux/userSlice'
import Recommendation from '../components/Recommendation'
const Container = styled.div`
 display:flex;
 gap:24px;
`
const Content = styled.div`
 flex:5;
`
const VideoWrapper = styled.div``
const Title = styled.h1`
 font-size:18px;
 font-weight:400;
 margin-top:20px;
 margin-bottom:10px;
 color:${({theme})=>theme.text}
`
const Details = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
`
const Info = styled.span`
 color : ${({theme})=>theme.textSoft}
`
const Buttons = styled.div`
display:flex;
gap:20px;
align-items:center;
color:${({theme})=>theme.text}
`
const Button = styled.div`
display:flex;
align-items:center;
gap:5px;
cursor:pointer;
`
const Hr = styled.hr`
 margin: 15px 0px;
 border:0.5px solid ${({theme})=>theme.soft}
`

const Channel = styled.div`
 display:flex;
 justify-content:space-between;
`
const ChannelInfo = styled.div`
 display:flex;
 gap:20px
`
const ChannelImg = styled.img`
 height:40px;
 width:40px;
 border-radius:50%;
`
const ChannelDetail = styled.div`
display:flex;
flex-direction:column;
color:${({theme})=>theme.text}
`
const ChannelName = styled.span`
font-weight:500;
`
const ChannelCounter =styled.span`
 margin-top:5px;
 margin-bottom:20px;
 color:${({theme})=>theme.text};
 font-size:12px;
`
const Description = styled.p`
font-size:14px;
`
const Subscribe = styled.button`
 background-color:#cc1a00;
 font-weight:500;
 color:#fff;
 border:none;
 cursor:pointer;
 border-radius:3px;
 height:max-content;
 padding:10px 20px;
`
const VideoFrame = styled.video`
 max-height:720px;
 width:100%;
 object-fit:cover;
`

const Video = () => {
  const { currentUser } = useSelector(state=>state.user)
  const { currentVideo } = useSelector(state=>state.video)
 
  const dispatch = useDispatch()
  const location = useLocation().pathname.split("/")[2]
  
  const [channel,setChannel] = useState({})
  
  useEffect(()=>{
    const fetchData = async() =>{
      try{
        const videoRes = await axios.get(`/api/videos/find/${location}`)
        
        
        const channelRes = await axios.get(`/api/users/find/${videoRes.data.userId}`)
        const {password,...others} = channelRes.data
        setChannel(others)
        dispatch(fetchSuccess(videoRes.data))
      }catch(e){}
    }
    fetchData()
  },[location,dispatch])
  

  const handleLike = async() =>{
    await axios.put(`/api/users/like/${currentVideo._id}`)
    dispatch(like(currentUser._id))
  }
  const handleDislike = async() =>{
    await axios.put(`/api/users/dislike/${currentVideo._id}`)
    dispatch(dislike(currentUser._id))
  }
  const handleSub = async() =>{
   currentUser.subscribedUsers.includes(channel._id) ? 
   await axios.put(`/api/users/unsub/${channel._id}`) :
   await axios.put(`/api/users/sub/${channel._id}`)
   dispatch(subscription(channel._id))
  }

  return (
    <Container>
      <Content>
         <VideoWrapper>
          <VideoFrame src={currentVideo.videoUrl} controls />
         </VideoWrapper>
         <Title>{currentVideo.title}</Title>
         <Details>
           <Info>
             {currentVideo.views} views {format(currentVideo.createdAt)}
           </Info>
           <Buttons>
            <Button onClick={handleLike}>
              {currentVideo.likes?.includes(currentUser?._id) ? 
              <ThumbUp/> : (

               <ThumbUpOutlined />)}
               {currentVideo.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
            {currentVideo.dislikes?.includes(currentUser?._id) 
            ? <ThumbDown /> :(
              <ThumbDownOutlined />)} Dislike
            
            </Button>
            <Button><ReplyOutlined/>Share</Button>
            <Button><DownloadOutlined/>Save</Button>
           </Buttons>
         </Details>
         <Hr/>
        <Channel>
         <ChannelInfo>
          <ChannelImg src={channel.img}/>
          <ChannelDetail>
            <ChannelName>{channel.name}</ChannelName>
            <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
            <Description>
             {currentVideo.desc}
            </Description>
          </ChannelDetail>
         </ChannelInfo>
         <Subscribe onClick={handleSub}>{currentUser?.subscribedUsers.includes(channel._id) ?  "Subscribed" : "Subscribe"}</Subscribe>
         </Channel>
         <Hr/>
         <Comments videoId={currentVideo._id}/>  
      </Content>
      <Recommendation tags={currentVideo.tags}/>
    </Container>
  )
}

export default Video