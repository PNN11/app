// test.spec.ts

import test from 'ava'
import Link from 'next/link'
import { replaceWithLinks } from 'utils/replaceWithLinks/replaceWithLinks'

test('replaceWithLinks should replace links correctly', t => {
    const input = 'This is a (link) [https://www.example.com]'
    const result = replaceWithLinks(input)

    const expected = [
        'This is a ',
        <Link className="text-cta" href="https://www.example.com">
            link
        </Link>,
    ]

    t.deepEqual(result, expected)
})

test('replaceWithLinks should handle multiple links correctly', t => {
    const input = 'Check out these (links) [https://www.link1.com] and [https://www.link2.com]'
    const result = replaceWithLinks(input)

    const expected = [
        'Check out these ',
        <Link className="text-cta" href="https://www.link1.com">
            links
        </Link>,
        ' and ',
        <Link className="text-cta" href="https://www.link2.com">
            https://www.link2.com
        </Link>,
    ]

    t.deepEqual(result, expected)
})

test('replaceWithLinks should handle no links correctly', t => {
    const input = 'This is a regular string with no links'
    const result = replaceWithLinks(input)

    const expected = [<span>{input}</span>]

    t.deepEqual(result, expected)
})

test('replaceWithLinks should throw an error when exceeding max loop count', t => {
    const input = 'This is a (link) [https://www.example.com]'
    t.throws(() => replaceWithLinks(input.repeat(20)), { message: 'Exceeded max loop count' })
})
