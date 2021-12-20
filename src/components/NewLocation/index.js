import { Formik, Field, Form } from "formik";
import { React, useState } from "react";
import {
  FormControl,
  FormLabel,
  InputGroup,
  Flex,
  Button,
  Input,
  Modal,
  ModalContent,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { CREATELOCATION } from "../../graphql/mutations/createLocation";
import { GETLOCATION } from "../../graphql/queries/getLocations";

function NewLocation() {
  const [isOpen, setisOpen] = useState(true);
  const [isError, setisError] = useState(false);
  const [createLocation] = useMutation(CREATELOCATION, {
    refetchQueries: [
      {query: GETLOCATION},
    ],
  });

  const close = () => {
    setisOpen(false);
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalContent
        bg="white"
        color="black"
        textAlign="center"
        h="400px"
        borderRadius="20"
        position="fixed"
        top="15%"
      >
        <Heading mt="2">Crea una nueva localización</Heading>
        <Text mt="2">
          Introduce los datos para craer una nueva localización
        </Text>

        <Formik
          initialValues={{
            name: "",
            direction: "",
          }}
          onSubmit={(values) => {
            if (values.name !== "" && /C\/ [A-Za-záéíóú]{,5} [0-9]{,1}/) {
              createLocation({
                variables: {
                  name: values.name,
                  direction: values.direction,
                },
              }).then(setisOpen(false));
            } else setisError(true);
          }}
        >
          <Form>
            <Field name="name">
              {({ field }) => (
                <FormControl className="formControl" top="20px" left="6">
                  <FormLabel>Nombre</FormLabel>
                  <InputGroup>
                    <Input
                      variant="outline"
                      color="black"
                      bg={"primary.300"}
                      size="md"
                      w="90%"
                      {...field}
                      borderRadius="20"
                    />
                  </InputGroup>
                </FormControl>
              )}
            </Field>

            <Field name="direction">
              {({ field }) => (
                <FormControl className="formControl" top="30px" left="6">
                  <FormLabel>Dirección</FormLabel>
                  <InputGroup>
                    <Input
                      variant="outline"
                      color="black"
                      bg={"primary.300"}
                      size="md"
                      w="90%"
                      {...field}
                      borderRadius="20"
                    />
                  </InputGroup>
                </FormControl>
              )}
            </Field>

            {isError ? (
              <Text position="relative" top="10" color="red">Datos no válidos</Text>
            ) : (
              ""
            )}

            <Flex justify="center">
              <Button
                mr="5"
                top="58px"
                color="white"
                fontSize="25"
                p="5"
                borderRadius="20"
                colorScheme="primary.100"
                variant="solid"
                bg="primary.200"
                type="submit"
              >
                Crear localización
              </Button>

              <Button
                top="58px"
                color="white"
                fontSize="25"
                p="5"
                borderRadius="20"
                colorScheme="primary.100"
                variant="solid"
                bg="primary.200"
                type="submit"
                onClick={close}
              >
                Cerrar
              </Button>
            </Flex>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
}

export default NewLocation;
