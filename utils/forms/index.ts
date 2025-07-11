import * as yup from 'yup'

import { Field, Fields } from './types'

export const addPathToFields = (fields: Fields, path?: string): (Field & { path?: string })[] => {
    return fields.map(field => {
        if (field.type !== 'group') {
            if (path) {
                if (field.type === 'radio') {
                    return {
                        ...field,
                        path: `${path}.${field.name}`,
                        props: { ...field.props, name: `${path}.${field.name}` },
                    }
                }

                if (field.type === 'checkbox') {
                    return {
                        ...field,
                        path: `${path}.${field.name}`,
                        props: { ...field.props, name: `${path}.${field.name}` },
                    }
                }

                return { ...field, path: `${path}.${field.name}` }
            }

            return { ...field, path: field.name }
        }

        return {
            ...field,
            path: path ? `${path}.${field.name}` : field.name,
            fields: addPathToFields(field.fields, field.name),
        }
    })
}

export const getState = (fields: Fields) => {
    let res: Record<string, any> = {}

    fields.forEach(field => {
        if (field.type !== 'group') {
            if (field.type === 'checkbox') {
                res = { ...res, [field.name]: false }

                return
            }

            if (field.type === 'radio') {
                res = { ...res, [field.name]: field.props.options[0].value }

                return
            }
            res = { ...res, [field.name]: '' }

            return
        }

        res = { ...res, [field.name]: getState(field.fields) }
    })

    return res
}

export const getValidationSchema = (fields: Fields) => {
    let schema: Record<string, any> = {}

    fields.forEach(field => {
        if (field.type !== 'group') {
            if (field.validation) {
                schema = { ...schema, [field.name]: field.validation }

                return
            }

            return
        }
        schema = { ...schema, [field.name]: getValidationSchema(field.fields) }
    })

    const res: Record<string, any> = {}

    Object.keys(schema).forEach(key => {
        if (Object.keys(schema[key] ?? {}).length) {
            res[key] = schema[key]
        }
    })

    if (Object.keys(res).length) return yup.object().shape(res)
}
