import React from 'react'

interface CourseDetailProps {
    currentTab: "videos" | "templature" | "assignments" | "review";
}

const CourseDetailTab = ({currentTab='videos'}: CourseDetailProps) => {
  return (
    <div className='py-4 tabs'>CourseDe</div>
  )
}

export default CourseDetailTab
