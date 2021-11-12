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
  Text,
  Image
} from "@chakra-ui/react";
import { EmailIcon, ViewIcon, ViewOffIcon, LockIcon } from "@chakra-ui/icons";
import { Formik, Form, Field } from "formik";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { REGISTER } from "../mutations/register";
import {setToken} from "../config/auth"


function Register() {
  let history = useHistory();
  const [register] = useMutation(REGISTER);
  const [isError, setisError] = useState("");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Center h="100vh" className="fondo" color="white">
       <div className="blackWall"></div>
          <Image src="logo.png" alt="logo" h="100"className="logo"/>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={(values) => {
          if (/[a-zA-Z0-9]@gmail.com/.test(values.email) && /[A-Z]{1,}[a-z]{1,}[0-9]{1,}/.test(values.password) 
          && values.password.length>=8 && values.username.length>0) {
            register({
              variables: {
                email: values.email,
                username: values.username,
                password: values.password,
              },
            })
              .then((data) => {
                if (data){
                  const token=data.data.register.jwt;
                  setToken(token);
                  history.push("/")
                } 
              })
              .catch((error) => setisError("existedUser"));
          } else setisError("error");
        }}
      >
        {(props) => (
          <Form>
            <Stack
              justify="center"
              h="60vh"
              w="50vh"
              align="center"
              className="form"
            >
              <Heading className="login">
                Bienvenido a JoinSports
              </Heading>
              <Text className="descriptionRegister">
                Introduzca sus datos para crear su cuenta
              </Text>

              <Field name="username">
                {({ field, form }) => (
                  <FormControl className="formControl">
                    <FormLabel htmlFor="username" mb={5}>
                      Nombre de usuario
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={
                          <FaUserAlt color="black" className="iconUser" />
                        }
                      />
                      <Input className="input" {...field} id="email" />
                    </InputGroup>
                  </FormControl>
                )}
              </Field>

              <Field name="email">
                {({ field, form }) => (
                  <FormControl className="formControl">
                    <FormLabel htmlFor="email" mb={5}>
                      Email (@gmail.com)
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={
                          <EmailIcon
                            color="black"
                            mt={8}
                            ml={4}
                            className="iconLeft"
                          />
                        }
                      />
                      <Input className="input" {...field} id="email" />
                    </InputGroup>
                  </FormControl>
                )}
              </Field>

              <Field name="password">
                {({ field, form }) => (
                  <FormControl className="formControl">
                    <FormLabel htmlFor="password" mb={5}>
                      Contraseña (mín 8)
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={
                          <LockIcon
                            color="black"
                            mt={7}
                            ml={4}
                            className="iconLeft"
                          />
                        }
                      />
                      <Input
                        className="input"
                        {...field}
                        type={show ? "text" : "password"}
                        id="password"
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          ml="18"
                          className="showPassword"
                          onClick={handleClick}
                        >
                          {!show ? (
                            <ViewIcon mt={4} ml={20} />
                          ) : (
                            <ViewOffIcon mt={4} ml={20} />
                          )}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                )}
              </Field>
              {isError === "existedUser" ? (
                <p className="errorRegister">Usuario ya existente</p>
              ) :isError === "error" ? (
                <p className="errorRegister">Credenciales no permitidas</p>
              ):""}
              <Button className="loginButton" mt={10} type="submit">
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
