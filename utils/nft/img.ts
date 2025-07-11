export const formatSrc = (src: string): string =>
    src ? src?.replace(/ipfs:\/\//, `https://ipfs.io/ipfs/`) : '/img/marketplace/unknown.png'
