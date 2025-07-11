import { FC } from 'react'

import Link from 'next/link'
import { useQuery } from 'react-query'
import { Swiper, SwiperSlide } from 'swiper/react'

import MainPageBlockWrapper from '../blockWrapper'
import TitleWithColorWords from '../titleWithColorWords'

import MainPageBlogCard from './card'

import SmallButton from 'components/common/ui/buttons/newSmallButton'
import { Container } from 'components/common/wrappers/container'
import useServiceStore from 'store/service'
import { getLinkToPost } from 'utils/getLinkToPost'

const limit = '3'

const MainPageBlog: FC = () => {
    const blogService = useServiceStore(store => store.blogService)

    const { data, isLoading, isError } = useQuery(['get-news', limit], () =>
        blogService.getNews({ limit, offset: '0' })
    )

    return (
        <MainPageBlockWrapper>
            <Container>
                <TitleWithColorWords
                    title="Join Our "
                    colorWords="Blog"
                    classes={{ colorWords: 'bg-mainPageBlogTitle' }}
                />
                <div
                    className="mx-auto mb-4 hidden max-w-274 grid-cols-3 gap-4 sm:grid"
                    data-aos="fade-in-zoom"
                >
                    {!isLoading &&
                        !isError &&
                        data?.docs &&
                        data.docs.map(
                            ({ id, preview, title, description, createdAt, address, category }) => (
                                <div key={id}>
                                    <MainPageBlogCard
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
                <div data-aos="fade-in-zoom">
                    <Swiper
                        slidesPerView={1.25}
                        spaceBetween={16}
                        className="mb-4 sm:!hidden"
                        style={{ paddingTop: '0.75rem' }}
                    >
                        {!isLoading &&
                            !isError &&
                            data?.docs &&
                            data.docs.map(
                                ({
                                    id,
                                    preview,
                                    title,
                                    description,
                                    createdAt,
                                    address,
                                    category,
                                }) => (
                                    <SwiperSlide key={id} style={{ height: 'auto' }}>
                                        <div data-aos="fade-up">
                                            <MainPageBlogCard
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
                    </Swiper>
                </div>
                <Link className="mt-10 flex justify-center" href="/blog" data-aos="fade-in-zoom">
                    <SmallButton color="white">Read More News</SmallButton>
                </Link>
            </Container>
        </MainPageBlockWrapper>
    )
}

export default MainPageBlog
