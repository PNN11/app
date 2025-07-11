import localFont from 'next/font/local'

export const qanelas = localFont({
    src: [
        {
            path: '../public/fonts/Qanelas-Thin.ttf',
            weight: '100',
            style: 'normal',
        },
        {
            path: '../public/fonts/Qanelas-UltraLight.ttf',
            weight: '200',
            style: 'normal',
        },
        {
            path: '../public/fonts/Qanelas-Light.ttf',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../public/fonts/Qanelas-Regular.ttf',
            weight: 'normal',
            style: 'normal',
        },
        {
            path: '../public/fonts/Qanelas-Medium.ttf',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../public/fonts/Qanelas-SemiBold.ttf',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../public/fonts/Qanelas-Bold.ttf',
            weight: 'bold',
            style: 'normal',
        },
        {
            path: '../public/fonts/Qanelas-ExtraBold.ttf',
            weight: '800',
            style: 'normal',
        },
        {
            path: '../public/fonts/Qanelas-Black.ttf',
            weight: '900',
            style: 'normal',
        },
    ],
    preload: true,
})
