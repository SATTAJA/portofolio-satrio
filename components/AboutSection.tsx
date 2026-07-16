import React from 'react'
import ScrollFloat from './ScrollFloat'

function AboutSection() {
  return (
    <div>
        <div className='text-white text-center font-orbitron text-3xl mb-20 mt-20'>
        <ScrollFloat
  animationDuration={1}
  ease='back.inOut(2)'
  scrollStart='center bottom+=50%'
  scrollEnd='bottom bottom-=40%'
  stagger={0.03}
>
  About Me
</ScrollFloat>
        </div>
        <p className='mb-50'>
            I'm Satrio Aji Kusumo, a Software Engineering student and a frontend-focused Full Stack Developer from Indonesia. I enjoy building modern web and mobile applications that combine clean design, intuitive user experiences, and scalable solutions. I believe great software is more than just writing code—it's about solving real problems and creating meaningful experiences for users. I'm constantly learning new technologies and challenging myself through real-world projects to grow as a developer.
        </p>
    </div>
  )
}

export default AboutSection