import React from 'react'
import Products from '@/components/admin/Products'
import UploadImages from '@/components/admin/UploadImages'


const HomePage = async ({params}) => {
  
  return (
    <>
    <UploadImages id={params.id}/>
    </>
  )
}

export default HomePage
