import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Steps from '@/components/Steps'
import React, { ReactNode } from 'react'

const Page = ({children} : {children: ReactNode}) => {
  return (
    <MaxWidthWrapper className='flex flex-1 flex-col w-full'>
        <Steps/>
        {children}
    </MaxWidthWrapper>
  )
}

export default Page