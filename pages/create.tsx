import Editor from '@/components/Editor'
import Navbar from '@/components/Navbar/Navbar'
import { Box } from '@chakra-ui/react'
import React from 'react'

const create = () => {
  return (
    <Box className="h-screen bg-grey-50">
    <Editor/>
  </Box>
  )
}

export default create