import * as Yup from 'yup'
import { AnyObject } from 'yup/es/types'

export const positiveNumber = (
    label: string,
    required: boolean = false,
    maxValue: number = null,
    moreThanValue: number = null,
    minValue: number = null
): Yup.NumberSchema<number | undefined, AnyObject, number | undefined> => {
    let schema = Yup.number().positive(
        `${label[0].toUpperCase() + label.slice(1)} should be positive`
    )

    if (maxValue) {
        schema = schema.max(
            maxValue,
            `${label[0].toUpperCase() + label.slice(1)} should be sess than ${maxValue}`
        )
    }

    if (moreThanValue) {
        schema = schema.moreThan(
            moreThanValue,
            `${label[0].toUpperCase() + label.slice(1)} should be more than ${moreThanValue}`
        )
    }

    if (minValue) {
        schema = schema.min(
            minValue,
            `${label[0].toUpperCase() + label.slice(1)} should be more than ${minValue}`
        )
    }

    if (required) schema = schema.required('Required field')

    return schema
}
