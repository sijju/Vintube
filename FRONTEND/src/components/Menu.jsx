import styled from 'styled-components'
import VIN from '../assets/logo.svg'
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import TheatersIcon from '@mui/icons-material/Theaters';
import LightModeIcon from '@mui/icons-material/LightMode';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
const Container = styled.div`
 flex: 1;
 background-color: ${({theme})=>theme.bgLighter};
 height:100vh;
 color: ${({theme})=>theme.text};
 font-size:14px;
 position:sticky;
 top:0;
`
const Wrapper = styled.div`
 padding : 18px 26px;
`
const Logo  = styled.div`
 display :flex;
 align-items:center;
 gap: 5px;
 font-weight:bold;
 margin-bottom:20px;
`
const Img = styled.img`
 height : 25px
`
const Item = styled.div`
 display:flex;
 align-items : center;
 gap:20px;
 cursor: pointer;
 padding : 7.5px 0px;

 &:hover{
  background-color : ${({theme})=>theme.soft}
 }
`
const Hr = styled.hr`
 margin: 5px 0px;
 border : 0.5px solid  ${({theme})=>theme.soft};
`
const Login= styled.div`

`
const Button = styled.button`
 padding: 5px 15px;
 background-color : transparent;
 border : 1px solid #3eafff;
 color : #3eafff;
 display : flex;
 align-items: center;
 gap: 5px;
 cursor:pointer;
`

const Menu = ({darkMode,setDarkMode}) => {
  const {currentUser}= useSelector(state=>state.user)
  const [subscribers,setSubscribers] = useState([])
  
  useEffect(()=> {
    const handleSub = () =>{
      setSubscribers(currentUser?.subscribedUsers)
    }
    handleSub()
  },[])
  
  
  return (
   <Container>
    <Wrapper>
      <Link to="/" style={{textDecoration:'none',color:'inherit'}}>
        <Logo>
          <Img src={VIN}/>
          VINVID
        </Logo>
      </Link>   
       <Link to="/" style={{textDecoration:'none',color:'inherit'}} >    
        <Item>
          <HomeIcon />
           Home
        </Item>
        </Link>  
        <Link to="trends" style={{textDecoration:'none',color:'inherit'}}>
         <Item>
           <ExploreIcon />
           Explore
         </Item>
        </Link>
        <Hr />
        <Link to="subscriptions" style={{textDecoration:'none',color:'inherit'}}> 
        <Item>
           <SubscriptionsIcon />
           Subscriptions
        </Item>
        
        </Link>
        <Hr />
        <Item>
          <VideoLibraryIcon/>
          Library
        </Item>
        <Item>
          <HistoryIcon />
          History
        </Item>
        <Hr />
        {!currentUser && 
        <>
         <Login>
          LOGIN WITH YOUR ACCOUNT
          <Link to="signin" style={{textDecoration:'none'}}>
          <Button>
            <AccountCircleOutlinedIcon/>
            SIGN IN</Button>
          </Link>   
         </Login>
         <Hr />
        </>
        }
        <Item>
          <MusicNoteIcon />
           Music
        </Item>
        <Item>
          <SportsCricketIcon/>
           Sports
        </Item>
        <Item>
          <SportsEsportsIcon />
           Gaming
        </Item>
        <Item>
          <TheatersIcon />
           Movies
        </Item>
        <Item>
          <LiveTvIcon />
          Live
        </Item>
        <Hr />
        <Item>
          <SettingsIcon /> 
          Settings           
        </Item>
        <Item>
          <HelpIcon />
           Help
        </Item>
        <Item onClick={()=>setDarkMode(!darkMode)}>
          <LightModeIcon/>
          {darkMode ? "Light" : "Dark"} Mode           
        </Item>
        

    </Wrapper>
   </Container>
  )
}

export default Menu