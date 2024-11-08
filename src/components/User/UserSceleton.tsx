import React from 'react'
import ContentLoader from "react-content-loader"

const UserSceleton = () => {
  return (
    <ContentLoader 
    speed={2}
    width={240}
    height={400}
    viewBox="0 0 240 400"
    backgroundColor="#c3c3c3"
    foregroundColor="#ecebeb"
  >
    <circle cx="75" cy="75" r="45" /> 
    <rect x="30" y="141" rx="5" ry="5" width="161" height="20" /> 
    <rect x="30" y="173" rx="5" ry="5" width="106" height="20" /> 
    <rect x="30" y="233" rx="5" ry="5" width="109" height="23" /> 
    <rect x="30" y="292" rx="5" ry="5" width="109" height="23" /> 
    <rect x="30" y="349" rx="5" ry="5" width="109" height="23" /> 
  </ContentLoader>
  )
}

export default UserSceleton