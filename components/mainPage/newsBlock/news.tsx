import { FC } from 'react'

import { useQuery } from 'react-query'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import NavigationSliderButton from '../bannersSlider/navigationSliderButton'

import NewsCard from 'components/common/postPreview'
import BlockTitle from 'components/common/ui/title/blockTitle'
import useServiceStore from 'store/service'
import { defaultDelay } from 'utils/constants/animations'
import { getLinkToPost } from 'utils/getLinkToPost'

interface NewsProps {
    classes?: { newsContainer?: string }
}

const News: FC<NewsProps> = ({ classes = { newsContainer: '' } }) => {
    const blogService = useServiceStore(store => store.blogService)

    const { data, isLoading, isError } = useQuery('get-news', () =>
        blogService.getNews({ limit: '4', offset: '0' })
    )

    return (
        <div>
            <BlockTitle>Arena news</BlockTitle>
            <div className={`mb-4 hidden grid-cols-2 gap-4 sm:grid ${classes.newsContainer}`}>
                {!isLoading &&
                    !isError &&
                    data?.docs &&
                    data.docs.map(
                        (
                            { id, preview, title, description, createdAt, address, category },
                            index
                        ) => (
                            <div
                                key={id}
                                data-aos="fade-up"
                                data-aos-delay={
                                    index < 2 ? defaultDelay + index * defaultDelay : defaultDelay
                                }
                            >
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
                    )}
            </div>
            <Swiper
                slidesPerView={1}
                spaceBetween={8}
                className="mb-4 sm:!hidden"
                style={{ paddingTop: '0.75rem' }}
                modules={[Navigation]}
                navigation={{ nextEl: '.arrow-next', prevEl: '.arrow-prev' }}
            >
                {!isLoading &&
                    !isError &&
                    data?.docs &&
                    data.docs.map(
                        ({ id, preview, title, description, createdAt, address, category }) => (
                            <SwiperSlide key={id} style={{ height: 'auto' }}>
                                <div data-aos="fade-up">
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
                            </SwiperSlide>
                        )
                    )}
                <div className="mt-4 flex w-full justify-center gap-4">
                    <NavigationSliderButton className="arrow-prev rotate-180" />
                    <NavigationSliderButton className="arrow-next" />
                </div>
            </Swiper>
        </div>
    )
}

export default News
