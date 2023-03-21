import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Card from '../components/Card'

const Container = styled.div`
 display:flex;
 flex-wrap: wrap;
 gap:10px;

`

const Search = () => {
    const query = useLocation().search
    const [videos,setVideos] = useState([])
    useEffect(()=>{
       const fetchData = async() =>{
        const res = await axios.get(`/api/videos/search${query}`)
        setVideos(res.data)
       }
       fetchData()
    },[query])
  return (
    <Container>
      {videos.map((video)=>(
        <Card  key={video._id} video={video} />
      ))}
    </Container>
  )
}

export default Search