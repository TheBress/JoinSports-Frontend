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
import {LOGIN} from "../mutations/login"
import { useHistory, Link } from "react-router-dom";

function Login() {
  let history = useHistory();
  const [login]=useMutation(LOGIN)
  const [isError, setisError] = useState(false)
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  
  return (
    <Center h="100vh" className="fondo" color="white">
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => {
        login({variables:{identifier:values.email,password:values.password}})
        .then(data=>{
          if(data) history.push("/home")
        })
        .catch(error=>setisError(true))
      }}
    >
      {(props) => (
        <Form>
          <Stack justify="center" h="51vh" w="50vh" bg="black" align="center" className="form">
          <Heading as="h2" className="login">Bienvenido a JoinSports</Heading>
          <Text className="descriptionLogin">Introduzca su correo y password para poder acceder</Text>
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
                <FormLabel htmlFor="password" mb={-14}>Contraseña</FormLabel>
                <Link to="/forgotPassword" className="forgotPassword">¿Olvidaste tu contraseña?</Link>
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
              <Text className="nuevaCuenta">¿No tienes cuenta? <Link to="/register" className="registrarse">regístrate aquí</Link></Text>
              {isError ? <p className="error">Correo o password no válidos</p> : ""}
          <Button
            className="loginButton"
            // isLoading={props.isSubmitting}
            mt={10}
            type="submit"
          >
            Iniciar sesión
          </Button>
          </Stack>
        </Form>
      )}
    </Formik>
    </Center>
  );
}

export default Login;
