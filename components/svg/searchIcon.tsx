import { FC } from 'react'

type SearchPropsType = {
    className?: string
}

export const SearchIcon: FC<SearchPropsType> = ({ className }) => {
    return (
        <svg
            className={className}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.2499 2.5999C4.68178 2.5999 2.5999 4.68178 2.5999 7.2499C2.5999 9.81803 4.68178 11.8999 7.2499 11.8999C9.81803 11.8999 11.8999 9.81803 11.8999 7.2499C11.8999 4.68178 9.81803 2.5999 7.2499 2.5999ZM1.3999 7.2499C1.3999 4.01904 4.01904 1.3999 7.2499 1.3999C10.4808 1.3999 13.0999 4.01904 13.0999 7.2499C13.0999 10.4808 10.4808 13.0999 7.2499 13.0999C4.01904 13.0999 1.3999 10.4808 1.3999 7.2499Z"
                fill="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.538 10.5383C10.7724 10.304 11.1523 10.304 11.3866 10.5383L14.4241 13.5758C14.6584 13.8101 14.6584 14.19 14.4241 14.4243C14.1898 14.6587 13.8099 14.6587 13.5756 14.4243L10.538 11.3868C10.3037 11.1525 10.3037 10.7726 10.538 10.5383Z"
                fill="currentColor"
            />
        </svg>
    )
}
