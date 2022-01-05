import { useMutation, useQuery } from "@apollo/client";
import {
  Modal,
  ModalContent,
  Heading,
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightAddon,
  Button,
  CheckboxGroup,
  Checkbox,
  Select,
  InputLeftElement,
  useToast,
  Flex,
  Textarea,
} from "@chakra-ui/react";
import { GiWeight, GiPerson } from "react-icons/gi";
import { FaCity } from "react-icons/fa";
import { Form, Formik, Field } from "formik";
import { React, useState } from "react";
import { GETSPORTS } from "../../graphql/queries/getSports";
import SelectCountries from "../SelectCountries";
import { UPDATEUSERINCOMPLETE } from "../../graphql/mutations/updateUserIncomplete";
import { ISAUTH } from "../../graphql/queries/isAuth";

function CompleteProfile(dataUser) {
  const { data } = useQuery(GETSPORTS);
  const [updateUserIncomplete] = useMutation(UPDATEUSERINCOMPLETE, {
    refetchQueries: [ISAUTH],
  });

  const datos = dataUser.dataUser;
  const toast = useToast();
  const [isOpen, setisOpen] = useState(true);
  let sportsChecked = [];

  datos?.favoriteSports.forEach((fsport) => {
    sportsChecked.push(fsport.id);
  });

  if (!datos) return null;

  return (
    <Modal isOpen={isOpen}>
      <ModalContent
        bg="white"
        color="black"
        textAlign="center"
        h="97vh"
        borderRadius="20"
        position="relative"
        top="5"
      >
        <Heading as="h3" mt="3">
          Completa tu perfil
        </Heading>
        <Text mt="2">Debes rellenar los siguientes campos para continuar</Text>
        <Formik
          initialValues={{
            cityResidence: datos.cityResidence,
            height: datos.height,
            weigth: datos.weigth,
            country: datos.nationality,
            sports: datos.favoriteSports.map((fsport) => {
              return fsport.id;
            }),
            birthDate: datos.birthDate,
            description: datos.description,
          }}
          onSubmit={(values) => {
            var today = new Date();
            var birthDate = new Date(values.birthDate);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
              age--;
            }
            if (
              values.height >= 145 &&
              values.height <= 230 &&
              values.weigth >= 40 &&
              values.weigth < 170 &&
              values.sports.length > 0 &&
              values.country !== null &&
              values.country !== "Elegir" &&
              values.country !== "" &&
              values.birthDate !== undefined &&
              age >= 18 &&
              age <= 65 &&
              values.description !== null
            ) {
              updateUserIncomplete({
                variables: {
                  id: datos.id,
                  cityResidence: values.cityResidence,
                  height: values.height,
                  weigth: values.weigth,
                  favoriteSports: values.sports,
                  nationality: values.country,
                  birthDate: values.birthDate,
                  description: values.description,
                },
              })
                .then((data) => {
                  if (data) {
                    setisOpen(false);
                    toast({
                      title: "Datos actualizados correctamente",
                      status: "success",
                      duration: 2000,
                    });
                  }
                })
                .catch((error) => console.log(error));
            } else {
              toast({
                title: "Datos erróneos",
                status: "error",
                duration: 2000,
              });
            }
          }}
        >
          <Form>
            <Flex p="4">
              <Field name="cityResidence">
                {({ field }) => (
                  <FormControl>
                    <FormLabel>Ciudad de residencia</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<FaCity />}
                      />
                      <Input
                        _focus={{
                          background: "#E0E0DE",
                        }}
                        variant="outline"
                        color="black"
                        bg={"primary.300"}
                        size="md"
                        w="170px"
                        {...field}
                        id="cityResidence"
                        borderRadius="20"
                      />
                    </InputGroup>
                  </FormControl>
                )}
              </Field>

              <Field name="birthDate">
                {({ field }) => (
                  <FormControl>
                    <FormLabel>Fecha de nacimiento</FormLabel>
                    <InputGroup>
                      <Input
                        _focus={{
                          background: "#E0E0DE",
                        }}
                        type="date"
                        variant="outline"
                        color="black"
                        bg={"primary.300"}
                        size="md"
                        w="auto"
                        {...field}
                        id="cityResidence"
                        borderRadius="20"
                      />
                    </InputGroup>
                  </FormControl>
                )}
              </Field>
            </Flex>

            <Flex p="4">
              <Field name="height">
                {({ field }) => (
                  <FormControl>
                    <FormLabel>Altura</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<GiPerson />}
                      />
                      <Input
                        _focus={{
                          background: "#E0E0DE",
                        }}
                        type="number"
                        variant="outline"
                        w="125px"
                        color="black"
                        bg={"primary.300"}
                        size="md"
                        {...field}
                        borderRadius="20"
                      />
                      <InputRightAddon
                        children="cm"
                        bg="primary.300"
                        right="3"
                        borderRadius="20"
                      />
                    </InputGroup>
                  </FormControl>
                )}
              </Field>

              <Field name="weigth">
                {({ field }) => (
                  <FormControl>
                    <FormLabel>Peso</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<GiWeight color="black" />}
                      />
                      <Input
                        _focus={{
                          background: "#E0E0DE",
                        }}
                        type="number"
                        variant="outline"
                        w="125px"
                        color="black"
                        bg={"primary.300"}
                        size="md"
                        {...field}
                        id="weight"
                        borderRadius="20"
                      />
                      <InputRightAddon
                        children="kg"
                        bg="primary.300"
                        right="3"
                        borderRadius="20"
                      />
                    </InputGroup>
                  </FormControl>
                )}
              </Field>
            </Flex>

            <Field name="description">
              {({ field }) => (
                <FormControl>
                  <FormLabel ml="6" mt="4">
                    Descripción personal y deportiva
                  </FormLabel>
                  <Textarea
                    ml="5"
                    mr="5"
                    bg="primary.300"
                    w="90%"
                    _focus={{
                      background: "#E0E0DE",
                    }}
                    {...field}
                  />
                </FormControl>
              )}
            </Field>

            <Field name="country">
              {({ field }) => (
                <FormControl>
                  <FormLabel ml="6" mt="4">
                    País de nacimiento
                  </FormLabel>
                  <Select
                    ml="5"
                    mr="5"
                    bg="primary.300"
                    w="100"
                    placeholder="Selecciona tu país"
                    {...field}
                  >
                    <SelectCountries />
                  </Select>
                </FormControl>
              )}
            </Field>

            <Field name="sports">
              {({ field }) => (
                <FormControl>
                  <FormLabel ml="6" mt="4">
                    Deportes favoritos
                  </FormLabel>
                  <CheckboxGroup
                    colorScheme="primary.300"
                    defaultValue={sportsChecked}
                  >
                    {data?.sports.map((sport) => {
                      return (
                        <Checkbox
                          mr="4"
                          {...field}
                          borderColor="primary.300"
                          value={sport.id}
                        >
                          {sport.Name}
                        </Checkbox>
                      );
                    })}
                  </CheckboxGroup>
                </FormControl>
              )}
            </Field>

            <Button
              position="relative"
              bottom="-10px"
              color="white"
              fontSize="25"
              p="5"
              borderRadius="20"
              colorScheme="primary.100"
              variant="solid"
              bg="primary.200"
              type="submit"
            >
              Guardar
            </Button>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
}

export default CompleteProfile;
