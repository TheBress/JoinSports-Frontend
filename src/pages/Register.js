import React, { useState } from "react";
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Text
} from "@chakra-ui/react";
import { EmailIcon,ViewIcon,ViewOffIcon,LockIcon} from "@chakra-ui/icons"
import { Formik, Form, Field } from "formik";
import {useMutation} from "@apollo/client"
import { useHistory } from "react-router-dom";
import {FaUserAlt} from "react-icons/fa"
import {REGISTER} from "../mutations/register"

function Register() {
  let history = useHistory();
  const [register]=useMutation(REGISTER)
  const [isError, setisError] = useState(false)
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  
  return (
    <Center h="100vh" className="fondo" color="white">
    <Formik
      initialValues={{ username:"", email: "", password: "" }}
      onSubmit={(values) => {
        register({variables:{email:values.email,username:values.username,password:values.password}})
        .then(data=>{console.log(data); })
        .catch(error=>setisError(true))
      }}
    >

      {(props) => (
        <Form>
          <Stack justify="center" h="56vh" w="50vh" bg="black" align="center" className="form">
          <Heading as="h2" className="login">Bienvenido a JoinSports</Heading>
          <Text className="descriptionLogin">Introduzca sus datos para crear su cuenta</Text>

          <Field name="username">
            {({ field, form }) => (
              <FormControl className="formControl">
                <FormLabel htmlFor="username" mb={5}>Nombre de usuario</FormLabel>
                <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaUserAlt color="black" className="iconUser" />}
                />
                <Input className="input" {...field} id="email" />
                </InputGroup>
              </FormControl>
            )}
          </Field>
          
          <Field name="email">
            {({ field, form }) => (
              <FormControl className="formControl">
                <FormLabel htmlFor="email" mb={5}>Email</FormLabel>
                <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<EmailIcon color="black" mt={8} ml={4} className="iconLeft" />}
                />
                <Input className="input" {...field} id="email" />
                </InputGroup>
              </FormControl>
            )}
          </Field>

          <Field name="password">
            {({ field, form }) => (
              <FormControl className="formControl">
                <FormLabel htmlFor="password" mb={5}>Contraseña</FormLabel>
                <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<LockIcon color="black" mt={7} ml={4} className="iconLeft" />}
                />
                <Input className="input" {...field} type={show ? "text" : "password"} id="password" />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" ml="18" className="showPassword" onClick={handleClick}>
                    {!show ? <ViewIcon mt={4} ml={20}/> : <ViewOffIcon mt={4} ml={20}/>}
                  </Button>
                </InputRightElement>
                </InputGroup>
              </FormControl>
            )}
          </Field>
              {isError ? <p className="error">Correo o password no válidos</p> : ""}
          <Button
            className="loginButton"
            mt={10}
            type="submit"
          >
            Crear cuenta
          </Button>
          </Stack>
        </Form>
      )}
    </Formik>
    </Center>
  );
}

export default Register;
