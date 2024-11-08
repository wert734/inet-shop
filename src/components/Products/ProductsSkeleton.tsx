import React from 'react'
import ContentLoader from 'react-content-loader'

const ProductsSkeleton = () => {
  return (
    <ContentLoader 
    speed={2}
    width='100%'
    height='100%'
    viewBox="0 0 323 248"
    backgroundColor="#c3c3c3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="18" ry="18" width="323" height="165" /> 
    <rect x="13" y="185" rx="5" ry="5" width="250" height="25" /> 
    <rect x="13" y="213" rx="5" ry="5" width="289" height="20" /> 
  </ContentLoader>
  )
}

export default ProductsSkeleton