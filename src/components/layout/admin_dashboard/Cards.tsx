import React from 'react'


export const data = [
    {
      id: 1,
      text: 'Total no of students',
      value: 670,
      color: '#FDF4E9',
      link: '/dashboard/admin/students',
    },
    {
      id: 2,
      text: 'Total no of tutors',
      value: 300,
      color: '#F8DEBD',
      link: '/dashboard/admin/tutors',
    },
    {
      id: 3,
      text: 'Subscription plan',
      value: 400,
      color: '#F4C991',
      link: '/dashboard/admin/subscription-plans',
    },
    {
      id: 4,
      text: 'Total no of free courses',
      value: 200,
      color: '#F0EAE8',
      link: '/dashboard/admin/courses/free-courses',
    },
    {
      id: 5,
      text: 'Total no of curriculum courses',
      value: 1000,
      color: '#ECD9D2',
      link: '/dashboard/admin/courses',
    },
    {
      id: 6,
      text: 'Total no of shopper courses',
      value: 300,
      color: '#DABFB6',
      link: '/dashboard/admin/courses/shopper-courses',
    }
  ]

const Cards = () => {
  return (
    <div>Cards</div>
  )
}

export default Cards
