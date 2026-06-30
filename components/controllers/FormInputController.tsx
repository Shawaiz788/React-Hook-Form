import React, { FC } from 'react'
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'
interface FormInputControllerProps {
    control: Control<FieldValues>,
    errors?: FieldErrors<FieldValues>,
    name: string,
    placeholder: string,
    props?: TextInputProps

}
const FormInputController: FC<FormInputControllerProps> = ({
    control,
    errors,
    name,
    placeholder,
    props
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value } }) =>
                <TextInput
                    placeholder={placeholder}
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    {...props}
                />
            }
        // rules={{ required: true, minLength: 3, maxLength: 12 }}
        //remove rules as we making them dynamic now
        />

        /* {errors.username && <Text
            style={styles.textError}
        >Name is required</Text>} */

    )
}

export default FormInputController

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        padding: 10,
        marginTop: 18,
        width: '90%'
    },
    button: {
        marginTop: 18,
        width: '90%',
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 24,
        color: 'white'
    }, textError: {
        color: 'red'
    }

})