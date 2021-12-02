import React, { useMemo, useState } from "react";
import Header from "../components/Header";
import { Authentication } from "../functions/authentication";
import {
  Center,
  Stack,
  useColorModeValue,
  Heading,
  Text,
  FormControl,
  useToast,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  Textarea,
  Select,
  Button,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import { Form, Formik, Field } from "formik";
import useSports from "../hooks/sports";
import useLocations from "../hooks/locations";
import IsAuth from "../hooks/isAuth";
import { useMutation } from "@apollo/client";
import { CREATEAD } from "../graphql/mutations/createAd";
import { GETADS } from "../graphql/queries/getAds";
import NewLocation from "../components/NewLocation";

function CreateAd() {
  Authentication();
  const toast = useToast();
  const { me } = IsAuth();
  const { sports } = useSports();
  const { locations } = useLocations();
  const [createAd] = useMutation(CREATEAD, {
    refetchQueries: {
      GETADS,
    },
  });
  const bg = useColorModeValue("black", "white");
  const color = useColorModeValue("white", "black");
  const [newLocation, setnewLocation] = useState(false)
  const nLocation=()=>{setnewLocation(true)}



  return (
    <>
      <Header />
      <Center h="90vh">
        <Stack
          borderRadius="20"
          bg={bg}
          color={color}
          justify="center"
          h="auto"
          w={{ lg: "73vh", base: "60vh" }}
          align="center"
        >
          <Heading>Crea tu anuncio personalizado</Heading>
          <Text>Introduce los datos del anuncio para poder crearlo</Text>
         
          <Formik
            initialValues={{
              name: "",
              description: "",
              date: "",
              sport: "",
              location: "",
            }}
            onSubmit={(values) => {
              console.log(me);
              createAd({
                variables: {
                  userId: me?.meExtended.id,
                  name: values.name,
                  description: values.description,
                  date: values.date,
                  sport: values.sport,
                  location: values.location,
                },
              }).then(
                toast({
                  title: "Datos actualizados correctamente",
                  status: "success",
                  duration: 2000,
                })
              );
            }}
          >
            <Form>
              <Stack justify="center">
                <Field name="name">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel>Nombre</FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<EmailIcon color="black" />}
                        />
                        <Input
                          mb={2}
                          variant="outline"
                          color="black"
                          bg={"primary.300"}
                          size="md"
                          {...field}
                          borderRadius="20"
                        />
                      </InputGroup>
                    </FormControl>
                  )}
                </Field>

                <Field name="description">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel>Descripción</FormLabel>
                      <Textarea
                        mb={2}
                        variant="outline"
                        color="black"
                        bg={"primary.300"}
                        size="md"
                        {...field}
                        borderRadius="20"
                      />
                    </FormControl>
                  )}
                </Field>

                <Field name="date">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel>Fecha</FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<EmailIcon color="black" />}
                        />
                        <Input
                          mb={2}
                          type="datetime-local"
                          variant="outline"
                          color="black"
                          bg={"primary.300"}
                          size="md"
                          {...field}
                          borderRadius="20"
                        />
                      </InputGroup>
                    </FormControl>
                  )}
                </Field>

                <Field name="sport">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel>Deporte</FormLabel>
                      <Select
                        ml="5"
                        mr="5"
                        bg="primary.300"
                        w="100"
                        placeholder="Selecciona un deporte"
                        {...field}
                      >
                        {sports?.sports.map((sport) => {
                          return <option value={sport.id}>{sport.Name}</option>;
                        })}
                        
                      </Select>
                    </FormControl>
                  )}
                </Field>
                <Field name="location">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel>Localización</FormLabel>
                      <Text cursor="pointer" onClick={nLocation}>Añadir nueva localización</Text>

                        <Select
                        ml="5"
                        mr="5"
                        bg="primary.300"
                        w="100"
                        color="black"
                        placeholder="Selecciona una localización"
                        {...field}
                      >
                        {locations?.locations.map((location) => {
                          return (
                            <option value={location.id}>
                              {location.Direction} ({location.Name})
                            </option>
                          );
                        })}
                       </Select>

                        {newLocation && (<NewLocation/>)}
                    </FormControl>
                  )}
                </Field>

                <Button
                  color="white"
                  fontSize="25"
                  p="5"
                  borderRadius="20"
                  colorScheme="primary.100"
                  variant="solid"
                  bg="primary.200"
                  type="submit"
                >
                  Crear anuncio
                </Button>
              </Stack>
            </Form>
          </Formik>

        </Stack>
      </Center>
    </>
  );
}

export default CreateAd;
