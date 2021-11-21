import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  InputGroup,
  InputLeftElement,
  Text,
  Image,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import { Formik, Form, Field } from "formik";
import { React, useState } from "react";
import { useMutation } from "@apollo/client";
import { FORGOTPASSWORD } from "../graphql/mutations/forgotPassword";

function ForgotPassword() {
  const [forgotPassword] = useMutation(FORGOTPASSWORD);
  const [isError, setisError] = useState(false);
  return (
    <Center h="100vh" className="fondo" color="white">
      <div className="blackWall"></div>
      <Image src="logo.png" alt="Segun Adebayo" h="100" className="logo" />
      <Formik
        initialValues={{ email: "" }}
        onSubmit={(values) => {
          forgotPassword({ variables: { email: values.email } })
          .then(data=>{
              if(data) console.log(data);
          }).catch(error=>setisError(true))
        }}
      >
        <Form>
          <Stack
            justify="center"
            h="60vh"
            w="60vh"
            align="center"
            className="form"
          >
            <Heading size="xl" color="white" zIndex="1">
                Bienvenido a JoinSports
              </Heading>
              <Text zIndex="1" fontSize="16px">
                Introduzca su correo y password para poder acceder
              </Text>

            <Field name="email">
              {({ field }) => (
                <FormControl >
                  <FormLabel>
                    Email
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<EmailIcon color="black" />}
                    />
                    <Input mb={4} variant="outline" color="black" bg={"primary.300"} size="md" {...field} id="email" borderRadius="20" />
                    </InputGroup>
                </FormControl>
              )}
            </Field>
            {isError ? (
              <p className="error">
                Este correo no se asocia con ningún usuario
              </p>
            ) : (
              ""
            )}
            <Button color="white" fontSize="25" p="5" borderRadius="20" colorScheme="primary.100" variant="solid" bg="primary.200" type="submit">
                Enviar
              </Button>
          </Stack>
        </Form>
      </Formik>
    </Center>
  );
}

export default ForgotPassword;
