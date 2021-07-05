import { useField } from 'formik'
import React from 'react'
import { FormField, Label } from 'semantic-ui-react'

export default function HrmsRating({...props}) {
    
    const [field,meta] = useField(props)

    return (
        <div>
            <FormField>
                <label>
                    {props.label}
                </label>
                
                <input
                    {...field} {...props}
                    type="range"
                    min={1}
                    max={5}
                >
                </input>

                {meta.touched && !!meta.error ? (
                    <Label pointing color="red" basic content={meta.error} />
                ): null}

            </FormField>

        </div>
    )
}
