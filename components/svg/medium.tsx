import { FC } from 'react'

interface MediumProps {
    className?: string
}

const Medium: FC<MediumProps> = ({ className = '' }) => {
    return (
        <svg
            width="54"
            height="54"
            viewBox="0 0 54 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <g clipPath="url(#clip0_6238_25425)">
                <path
                    d="M30.5005 26.5091C30.5005 34.8187 23.8222 41.5548 15.5845 41.5548C7.3468 41.5548 0.667969 34.8171 0.667969 26.5091C0.667969 18.2011 7.34629 11.4629 15.5845 11.4629C23.8227 11.4629 30.5005 18.1996 30.5005 26.5091Z"
                    fill="currentColor"
                />
                <path
                    d="M46.8618 26.5091C46.8618 34.3307 43.5227 40.674 39.4036 40.674C35.2845 40.674 31.9453 34.3307 31.9453 26.5091C31.9453 18.6875 35.284 12.3442 39.4031 12.3442C43.5222 12.3442 46.8613 18.6854 46.8613 26.5091"
                    fill="currentColor"
                />
                <path
                    d="M53.5582 26.5093C53.5582 33.5156 52.384 39.1988 50.9351 39.1988C49.4862 39.1988 48.3125 33.5171 48.3125 26.5093C48.3125 19.5015 49.4867 13.8198 50.9351 13.8198C52.3835 13.8198 53.5582 19.501 53.5582 26.5093Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath id="clip0_6238_25425">
                    <rect
                        width="52.8889"
                        height="52.8889"
                        fill="currentColor"
                        transform="translate(0.667969 0.444336)"
                    />
                </clipPath>
            </defs>
        </svg>
    )
}

export default Medium
