import React from 'react'
import { FormField, Icon, Label } from 'semantic-ui-react'
import { Field, useField } from 'formik'

export default function HrmsTextInput({...props}) {
    
    const [field, meta] = useField(props)

    return (
        <FormField error={meta.touched && !!meta.error}>

            <label style={{textAlign:"left"}}>
                {props.label}  
                <Icon style={{marginLeft:"5px"}} name={props.icon} />
            </label>
            <Field as={props.control} {...field} {...props} />
            {meta.touched && !!meta.error ? (
                <Label pointing content={meta.error} basic color="red"/>
            ) : null}
        </FormField>
    )
}
