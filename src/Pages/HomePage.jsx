import LatestIdeaSection from '@/components/latest-idea-section'
import PopularSection from '@/components/popular-section/PopularSection'
import React from 'react'

const HomePage = () => {
  return (
    <div>
        <PopularSection/>
        <LatestIdeaSection/>
    </div>
  )
}

export default HomePage