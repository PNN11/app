import assert from 'assert'

export function isDeepEqual(actual: any, expected: any): boolean {
    try {
        assert.deepStrictEqual(actual, expected)

        return true
    } catch (e: unknown) {
        return false
    }
}
