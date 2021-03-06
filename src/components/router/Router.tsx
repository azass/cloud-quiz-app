import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { RouteAuthGuard } from '../atoms/RouteAuthGuard'
import { Home, QuizEditor } from '../pages'
import { Login } from '../pages/Login'

export const Router: React.VFC = () => {
  return (
    <Routes>
      <Route path="/" element={<RouteAuthGuard component={<Home />} />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/editor"
        element={<RouteAuthGuard component={<QuizEditor />} />}
      />
      <Route
        path="/editor/:exam_id"
        element={<RouteAuthGuard component={<QuizEditor />} />}
      />
      <Route
        path="/editor/:exam_id/:quest_id"
        element={<RouteAuthGuard component={<QuizEditor />} />}
      />
    </Routes>
  )
}
