import { FC } from 'react'

const closeMobileMenu: FC = () => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="3.67871"
                y="2.5"
                width="20.705"
                height="1.66667"
                rx="0.833333"
                transform="rotate(45 3.67871 2.5)"
                fill="white"
            />
            <rect
                width="20.705"
                height="1.66667"
                rx="0.833333"
                transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 3.67871 18.3193)"
                fill="white"
            />
        </svg>
    )
}

export default closeMobileMenu
