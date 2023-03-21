import {auth,provider} from '../utils/firebase.js'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`

 display:flex;
 align-items:center;
 justify-content:center;
 height: calc(100vh - 56px);
 color: ${({theme})=>theme.text}
`
const  Wrapper = styled.div`
 display:flex;
 align-items:center;
 flex-direction:column;
 border : 1px solid ${({theme})=>theme.soft};
 background-color: ${({theme})=>theme.bgLighter};
 padding: 20px 100px;
 gap:10px;

`
const Title=styled.h1`
 font-size:24px;
`
const Sub = styled.h2`
 font-size:20px;
 font-weight:300;
`
const Input = styled.input`
 border:1px solid ${({theme})=>theme.soft};
 outline:none;
 padding:10px;
 border-radius:7px;
 background-color:transparent;
 width:100%;
 color : ${({theme})=>theme.text}
`
const Button = styled.button`
 border:none;
 cursor:pointer;
 padding:10px 20px;
 background-color:${({theme})=>theme.soft};
 color:${({theme})=>theme.textSoft};
 border-radius:3px;
`
const Login = () => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogin = async(e) =>{
    e.preventDefault()
    dispatch(loginStart())
    try {
      const res = await axios.post(`/api/auth/signin`,{name,password})
      dispatch(loginSuccess(res.data))
      navigate(`/`)
    } catch (error) {
      dispatch(loginFailure(error))
    }
  }
  const handleGoogle = async() => {
      signInWithPopup(auth,provider)
      .then((result)=>{
         axios.post(`/api/auth/google`,{
           name : result.user.displayName,
           email : result.user.email,
           img : result.user.photoURL
         }).then((res)=>{
          dispatch(loginSuccess(res.data))
          navigate(`/`)
         })
      }).catch((err)=>{
        dispatch(loginError(err))
      })
  }
  return (
    <Container>
      <Wrapper>
      <Title>Sign In </Title>
      <Sub>For More Benefits</Sub>
      <Input placeholder="username" value={name} onChange={e=> setName(e.target.value)}/>
      <Input type="password" placeholder="Password" onChange={e=> setPassword(e.target.value)}/>
      <Button onClick={handleLogin}>Login</Button>
      <Sub>Or</Sub>
      <Button onClick={handleGoogle}>Signin With Google</Button>
      <Sub>Or</Sub>
      <Input placeholder="username" onChange={e=> setName(e.target.value)}/>
      <Input type="email" placeholder="Email"  onChange={e=>setEmail(e.target.value)}/>
      <Input type="password" placeholder="Password" onChange={e=> setPassword(e.target.value)}/>
      <Button>Register</Button>

      </Wrapper>
      
    </Container>
  )
}

export default Login