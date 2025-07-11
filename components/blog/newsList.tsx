import { FC, useState } from 'react'

import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'

import NewsCard from 'components/common/postPreview'
import useServiceStore from 'store/service'
import { QueryKeys } from 'utils/constants/reactQuery'
import { getLinkToPost } from 'utils/getLinkToPost'

const NewsList: FC = () => {
    const blogService = useServiceStore(store => store.blogService)
    const [limit] = useState(8)

    const { data, isError, isLoading, fetchNextPage } = useInfiniteQuery(
        QueryKeys.GET_ALL_NEWS,
        ({ pageParam = 1, signal }) =>
            blogService.getNews({
                limit: limit.toString(),
                offset: ((pageParam - 1) * limit).toString(),
                signal,
            }),
        {
            getNextPageParam: lastPage => {
                if (lastPage?.nextPage) return lastPage?.nextPage
            },
        }
    )

    const { ref } = useInView({
        threshold: 0,
        onChange(inView) {
            if (inView) fetchNextPage()
        },
        rootMargin: '150px',
    })

    return (
        <div>
            <h1 className="mb-4 text-custom-3xl font-medium">
                Arena Games Web3 Gaming News and Blog Articles
            </h1>
            <div
                className={`mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 `}
            >
                {!isLoading &&
                    !isError &&
                    data?.pages &&
                    data.pages.map(page =>
                        page.docs?.map(
                            ({ id, preview, title, description, createdAt, address, category }) => (
                                <div key={id}>
                                    <NewsCard
                                        news={{
                                            createdAt,
                                            title,
                                            image: preview,
                                            description,
                                            id,
                                        }}
                                        link={getLinkToPost(address, category)}
                                    />
                                </div>
                            )
                        )
                    )}
            </div>
            <div ref={ref} />
        </div>
    )
}

export default NewsList
