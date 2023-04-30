import log from 'loglevel'
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js'
import { useAppDispatch } from '../app/hooks'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setIdToken, setTab } from '../slices/editSlice'
import Label from '../consts/labels'

export const useAuthentication = () => {
  log.setLevel('info')
  const tabs = Label.tabs
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate()
  const userPool = new CognitoUserPool({
    UserPoolId: process.env.REACT_APP_AUTH_USER_POOL_ID || '',
    ClientId: process.env.REACT_APP_AUTH_USER_POOL_WEB_CLIENT_ID || '',
  })
  const signIn = () => {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    })
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    })

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        log.debug('result: ' + result)
        const accessToken = result.getAccessToken().getJwtToken()
        log.debug('AccessToken: ' + accessToken)
        const idToken = result.getIdToken().getJwtToken()
        log.debug('IdToken: ' + idToken)
        dispatch(setIdToken(idToken))
        setEmail('')
        setPassword('')
        navigate('/editor')
      },
      onFailure: (err) => {
        console.error(err)
      },
    })
  }
  const logout = () => {
    const cognitoUser = userPool.getCurrentUser()
    if (cognitoUser) {
      cognitoUser.signOut()
      localStorage.clear()
      dispatch(setTab(tabs[0]))
      log.debug('signed out')
    } else {
      localStorage.clear()
      log.debug('no user signing in')
    }
  }
  const changedEmailHaldler = (e: any) => setEmail(e.target.value)
  const changedPasswordHandler = (e: any) => setPassword(e.target.value)
  return {
    signIn,
    logout,
    changedEmailHaldler,
    changedPasswordHandler
  }
}
