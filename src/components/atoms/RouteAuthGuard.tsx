import { CognitoUserPool } from 'amazon-cognito-identity-js'
import React from 'react'
import { Navigate } from 'react-router-dom'

type Props = {
  component: React.ReactNode
}
export const RouteAuthGuard: React.VFC<Props> = (props) => {
  const userPool = new CognitoUserPool({
    UserPoolId: process.env.REACT_APP_AUTH_USER_POOL_ID || '',
    ClientId: process.env.REACT_APP_AUTH_USER_POOL_WEB_CLIENT_ID || '',
  })
  const cognitoUser = userPool.getCurrentUser()
  if (cognitoUser) {
    return <>{props.component}</>
  } else {
    return <Navigate to="/login" />
  }
}
