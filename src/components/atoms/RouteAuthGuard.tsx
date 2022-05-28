import { CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js'
import React, { memo } from 'react'
import { Navigate } from 'react-router-dom'
import log from 'loglevel'

type Props = {
  component: React.ReactNode
}
export const RouteAuthGuard: React.VFC<Props> = memo((props) => {
  log.setLevel("info")
  const userPool = new CognitoUserPool({
    UserPoolId: process.env.REACT_APP_AUTH_USER_POOL_ID || '',
    ClientId: process.env.REACT_APP_AUTH_USER_POOL_WEB_CLIENT_ID || '',
  })
  const cognitoUser = userPool.getCurrentUser()
  let result
  if (cognitoUser) {
    cognitoUser.getSession(function (err: any, session: CognitoUserSession) {
      if (err) {
        result = false
      } else {
        log.info("session:")
        log.info(session)
        result = session.isValid
      }
    })
    if (result) {
      return <>{props.component}</>
    } else {
      return <Navigate to="/login" />
    }
  } else {
    return <Navigate to="/login" />
  }
})
