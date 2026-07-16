import React from 'react'
import ScrollFloat from './ScrollFloat'
import ScrollReveal from './ScrollRevealProps'

function AboutSection() {
  return (
    <div className=''>
        <div className='text-white text-center font-orbitron text-3xl mb-10 mt-15'>
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
        <div className='mb-20 font-mono'>
        <ScrollReveal
  baseOpacity={0.1}
  enableBlur
  baseRotation={3}
  blurStrength={4}
>
I'm Satrio Aji Kusumo, a Software Engineering student and a frontend-focused Full Stack Developer from Indonesia. I enjoy building modern web and mobile applications that combine clean design, intuitive user experiences, and scalable solutions. I believe great software is more than just writing code—it's about solving real problems and creating meaningful experiences for users. I'm constantly learning new technologies and challenging myself through real-world projects to grow as a developer.
</ScrollReveal>
    </div>
    </div>
  )
}

export default AboutSection