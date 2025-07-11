export const getLinkToPost = (address: string, category: string): string => {
    return category === 'all' ? `/blog/${address}` : `/blog/${category}/${address}`
}
