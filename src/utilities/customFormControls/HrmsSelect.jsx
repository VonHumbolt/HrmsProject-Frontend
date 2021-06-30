import { useField, Field } from 'formik'
import React from 'react'
import { FormField, Label } from 'semantic-ui-react'


export default function HrmsSelect({...props}) {
    
    const [field, meta] = useField(props)

    console.log(meta)

    return (
        <FormField>
        <label>
            {props.label}
        </label>
        
        <Field as="select" {...field} {...props} >
            <option value="" default hidden>{props.placeholder}</option>
            {props.options.map(option => {
                return (
                    <option key={option.key} value={option.key}>
                        {option.value}
                    </option>
                )
            })}
        </Field>
        
        {meta.touched && !!meta.error ? (
            <Label pointing color="red" basic content={meta.error} />
        ) : null}

    </FormField>
    
    )
}
