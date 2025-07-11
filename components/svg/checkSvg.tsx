const CheckSvg = ({ width = 12, height = 12, className = '' }): JSX.Element => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${className}`}
        >
            <path
                d="M10.5 1L4.5 7L1.5 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default CheckSvg
