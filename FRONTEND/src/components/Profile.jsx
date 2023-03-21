import { LightMode, LoginOutlined } from '@mui/icons-material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { logout } from '../redux/userSlice'

const Container = styled.div`
  position: absolute;
  right:50px;
  top:50px;
  z-index:999;
  background-color: ${({theme})=>theme.soft};
  padding: 20px;
  -webkit-box-shadow:0px 0px 7px -5px rgba(0,0,0,0.5);
  box-shadow: 0px 0px 7px -5px rgba(0,0,0,0.5);
`
const Wrapper = styled.div`
 display : flex;
 align-items:center;
 flex-direction:column;
 gap:10px;
`
const Button = styled.button`
 padding: 5px 15px;
 background-color : transparent;
 border : 1px solid transparent;
 color : #3eafff;
 border-radius : 5px;
 font-weight : 500;

 display : flex;
 align-items: center;
 gap: 5px;
 cursor:pointer;
`
const Title = styled.h1`
 font-size:18px;
 font-weight : 500;
 color : ${({theme})=>theme.textSoft}
`
const Profile = () => {
    const { currentUser } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () =>{
        dispatch(logout())
        navigate(`/signin`)
      } 
  return (
    <Container>
        <Wrapper>
          <Title>{currentUser?.name}</Title>  
          
          <Button onClick={handleLogout}>
           <LoginOutlined />  Logout
          </Button> 
        </Wrapper>
    </Container>
  )
}

export default Profile