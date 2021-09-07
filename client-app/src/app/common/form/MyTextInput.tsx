import { useField } from 'formik';
import React from 'react';
import { Label } from 'semantic-ui-react';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    type?:string;

}
export default function MyTextInput(props: Props) {
    const [field, meta] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <input {...field} {...props} />
            {meta.touched && meta.error ? (
                <Label basic color='red' >{meta.error}</Label>
            ) : null}
        </Form.Field>

    );


}