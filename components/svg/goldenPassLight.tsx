import { FC } from 'react'

interface GoldenPassLightProps {
    className?: string
}

const GoldenPassLight: FC<GoldenPassLightProps> = ({ className = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="755"
            height="766"
            viewBox="0 0 755 766"
            fill="none"
            className={className}
        >
            <path
                opacity="0.24"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M354.881 438.418L283.125 766L471.875 766L400.119 438.418L577.701 721.519L711.168 586.128L432.122 405.959L755 478.75L755 287.25L432.122 360.052L711.158 179.882L577.711 44.4706L400.129 327.582L471.875 3.62836e-05L283.125 1.97825e-05L354.881 327.582L177.299 44.4812L43.832 179.872L322.878 360.052L-1.91815e-05 287.25L-3.5923e-05 478.75L322.878 405.948L43.8424 586.118L177.289 721.529L354.881 438.418Z"
                fill="url(#paint0_radial_11831_72858)"
            />
            <defs>
                <radialGradient
                    id="paint0_radial_11831_72858"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(377.5 383) rotate(-180) scale(377.5 383)"
                >
                    <stop stopColor="white" stopOpacity="0.61" />
                    <stop offset="0.942708" stopColor="white" stopOpacity="0" />
                </radialGradient>
            </defs>
        </svg>
    )
}

export default GoldenPassLight
