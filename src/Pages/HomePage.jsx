import LatestIdeaSection from '@/components/latest-idea-section'
import PopularSection from '@/components/popular-section/PopularSection'
import React from 'react'

const HomePage = () => {
  return (
    <div>
        <PopularSection/>
        <LatestIdeaSection/>

        <div className='h-screen'>

        </div>
    </div>
  )
}

export default HomePage