import { MutableRefObject } from 'react'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

export const applyAnimationOnMainPage = (
    ref: MutableRefObject<HTMLDivElement>
): (gsap.core.Tween | gsap.core.Timeline)[] => {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#animation-container',
            scrub: 1,
            pin: true,
            start: 'top top',
            end: '+=120%',
            // markers: { indent: 100 },
            onLeave: () => {
                ref.current.classList.add('static-position')
            },
            onEnterBack: () => {
                ref.current.classList.remove('static-position')
            },
        },
    })

    const firstScreenAnim = gsap.to('#main-page-first-screen', {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
            trigger: '#main-page-first-screen',
            scrub: 1,

            start: 'top top',
            end: '70% 30%',
            // markers: true,
        },
    })
    const firstScreenVideoAnim = gsap.to('#main-page-video-container', {
        display: 'none',
        ease: 'none',
        scrollTrigger: {
            trigger: '#main-page-first-screen',
            scrub: true,

            start: 'top top',
            end: '70% 30%',
            // markers: true,
        },
    })

    const logoContainerAnim = gsap.to('#logo-container', {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
            trigger: '#logo-container',
            scrub: 1,

            start: '20% top',
            end: '70% 30%',
            // markers: true,
        },
    })

    const logoAnim = gsap.to('#logo-container .logo', {
        width: '100%',
        scale: 1.2,
        top: '-15%',
        ease: 'none',

        scrollTrigger: {
            trigger: '#logo-container',
            scrub: 1,

            start: '40% top',
            end: '100% 10%',
            // markers: true,
        },
    })

    const logoHidAnim = gsap.to('#logo-container .logo', {
        opacity: 0,
        ease: 'none',

        scrollTrigger: {
            trigger: '#logo-container',
            scrub: 1,

            start: '100% 0%',
            end: '100% 0%',
            // markers: true,
        },
    })

    const logoShadowAnim = gsap.to('#logo-container .logo-shadow', {
        opacity: 1,
        ease: 'none',

        scrollTrigger: {
            trigger: '#logo-container',
            scrub: 1,

            start: '100% 0%',
            end: '100% 0%',
            // markers: true,
        },
    })

    const logoFillAnim = gsap.to('#logo-container .logo', {
        color: 'transparent',
        ease: 'none',
        scrollTrigger: {
            trigger: '#logo-container',
            scrub: 1,

            start: '60% top',
            end: '80% 10%',
            // markers: true,
        },
    })

    const thirdScreenAnim = gsap.to('#third-screen', {
        opacity: 1,
        width: '100%',
        ease: 'none',
        scrollTrigger: {
            trigger: '#main-page-first-screen',
            scrub: 0.2,

            start: '100% top',
            end: '100% 0%',
            // markers: true,
        },
    })

    const tweenVideo = gsap.to('#main-page-video-container', {
        scrollTrigger: {
            trigger: '#main-page-video-container',
            start: '0% 0%',
            end: '70% 30%',
            // markers: true,
            scrub: true,
        },

        // rotation: 330,
        scale: 0.6,
        ease: 'none',
    })

    return [
        tl,
        firstScreenAnim,
        logoAnim,
        logoContainerAnim,
        logoFillAnim,
        thirdScreenAnim,
        tweenVideo,
        logoHidAnim,
        logoShadowAnim,
        firstScreenVideoAnim,
    ]
}
