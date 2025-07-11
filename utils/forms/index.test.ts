// test.spec.ts

import test from 'ava'
import { addPathToFields, getValidationSchema } from 'utils/forms'
import { Fields } from 'utils/forms/types'
import * as yup from 'yup'

// Sample test data
const sampleFields: Fields = [
    { name: 'username', title: 'Username', type: 'text' },
    { name: 'email', title: 'Email', type: 'text' },
    {
        name: 'contact',
        title: 'Contact',
        type: 'group',
        fields: [{ name: 'phone', title: 'Phone', type: 'phone' }],
    },
]

test('addPathToFields should add path to fields', t => {
    const result = addPathToFields(sampleFields)
    const expected: Fields = [
        { name: 'username', title: 'Username', type: 'text', path: 'username' },
        { name: 'email', title: 'Email', type: 'text', path: 'email' },
        {
            name: 'contact',
            title: 'Contact',
            type: 'group',
            fields: [{ name: 'phone', title: 'Phone', type: 'phone', path: 'contact.phone' }],
            path: 'contact',
        },
    ]
    t.deepEqual(result, expected)
})

test('getValidationSchema should return Yup schema for fields with validation', t => {
    const fields: Fields = [
        { name: 'username', title: 'Username', type: 'text' },
        {
            name: 'email',
            title: 'Email',
            type: 'text',
            validation: yup.string().email('Invalid email').required('Email is required'),
        },
    ]
    const schema = getValidationSchema(fields)
    t.true(schema instanceof yup.ObjectSchema)
    t.like(schema.describe().fields, {
        email: { type: 'string' },
    })
})

test('getValidationSchema should return undefined for fields without validation', t => {
    const fields: Fields = [
        { name: 'username', title: 'Username', type: 'text' },
        { name: 'email', title: 'Email', type: 'text' },
    ]
    const schema = getValidationSchema(fields)
    t.is(schema, undefined)
})
