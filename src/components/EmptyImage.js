import React from 'react'
import man from './man.png'

export default function EmptyImage() {
  return (
    <div>
      <img src={man} alt="Write down some notes!"/>
      <p>Got anything in mind? Quickly write it down</p>
    </div>
  )
}
