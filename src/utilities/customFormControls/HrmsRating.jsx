import { useField } from 'formik'
import React from 'react'
import { useState } from 'react'
import { FormField, Label, Rating } from 'semantic-ui-react'

export default function HrmsRating({...props}) {
    
    const [field,meta] = useField(props)
    const [ratingValue, setRatingValue] = useState()

    return (
        <div>
            <FormField>
                <label>
                    {props.label}
                </label>
                
                <Rating
                    {...field} {...props}
                    rating={ratingValue}
                    maxRating={5}
                    onRate={(e) => setRatingValue(e.target.ariaPosInSet)}
                >
                </Rating>

                {meta.touched && !!meta.error ? (
                    <Label pointing color="red" basic content={meta.error} />
                ): null}

            </FormField>

        </div>
    )
}
