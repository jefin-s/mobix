    import React from 'react'
    import aboutpic from '/src/assets/aboutpic.png'

    const About = () => {
    return (
        <div >

            <div className='flex  justify-center items-center h-screen'>
                <div>
                    <h1 className='text-7xl font-bold'>Icloud</h1>
                    <h1>The Trusted Apple product sellers</h1>
                </div>
                <div>
                    <img src={aboutpic} alt="" className='h-[201px] md:h-[625px]'/>
                </div>
            </div>
        </div>
    )
    }

    export default About