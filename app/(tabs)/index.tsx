import FormInputController from '@/components/controllers/FormInputController'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const index = () => {
  const {
    control,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm()


  const submit = (data) => {
    console.log(data)
    Alert.alert(JSON.stringify(data))
  }
  return (
    <View style={styles.container}>
      <Text>React Hook Form Example in react native</Text>

      <FormInputController
        control={control}
        name={"username"}
        placeholder={"Username"}
      />

      <FormInputController
        control={control}
        name={"email"}
        placeholder={"Enter Your Email"}
      />

      <FormInputController
        control={control}
        name={"Password"}
        placeholder={"Enter Your Password"}
        props={{
          secureTextEntry: true
        }}
      />





      <TouchableOpacity
        onPress={handleSubmit(submit)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

    </View>
  )
}

export default index

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