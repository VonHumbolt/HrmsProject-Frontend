import { useField, Field } from 'formik'
import React from 'react'
import { FormField, Label } from 'semantic-ui-react'

export default function HrmsTextArea({...props}) {

    const [field,meta] = useField(props)
    return (
      
            <FormField>
                <label>
                    {props.label}
                </label>

                <Field as="textarea" {...field} {...props}>
                    
                </Field>
                
                {meta.touched && !!meta.error ? (
                    <Label pointing color="red" basic content={meta.error} />
                ): null }

            </FormField>

    )
}
