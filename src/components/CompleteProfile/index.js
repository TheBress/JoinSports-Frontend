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
} from "@chakra-ui/react";
import {GiWeight,GiPerson} from "react-icons/gi"
import {FaCity} from "react-icons/fa"
import { Form, Formik, Field } from "formik";
import {React,useState} from "react";
import { GETSPORTS } from "../../graphql/queries/getSports";
import SelectCountries from "../SelectCountries";
import { UPDATEUSERINCOMPLETE } from "../../graphql/mutations/updateUserIncomplete";
import { ISAUTH } from "../../graphql/queries/isAuth";

function CompleteProfile(dataUser) {
  const { data } = useQuery(GETSPORTS);
  const [updateUserIncomplete]=useMutation(UPDATEUSERINCOMPLETE,{
    refetchQueries:[
      ISAUTH
    ]
  });
  
  const [isError, setisError] = useState(false);
  const datos = dataUser.dataUser;
  const toast = useToast();
  const [isOpen, setisOpen] = useState(true);
  let sportsChecked=[];


    datos?.favoriteSports.map(fsport=>{
       sportsChecked.push(fsport.id);
      return "a";
    })

  
  return (
    <Modal isOpen={isOpen}>
      <ModalContent
        bg="white"
        color="black"
        textAlign="center"
        h="560px"
        borderRadius="20"
        position="fixed"
        top="12"
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
            sports: datos.favoriteSports.map(fsport=>{return fsport.id}),
            age:datos.age
          }}
          onSubmit={(values) => {
            console.log(values);
            if(values.height>=145 && values.height<=230 &&values.weigth>=40 && values.weigth<170 && values.sports.length>0
              && values.country!==undefined && values.age>=18 && values.age<=60){
            updateUserIncomplete({
              variables:{
                id:datos.id,
                cityResidence:values.cityResidence,
                height:values.height,
                weigth:values.weigth,
                favoriteSports:values.sports,
                nationality:values.country,
                age:values.age
              }
            }).then((data)=>{if(data) {
              setisError(false)
              setisOpen(false);
              toast({
                title: "Datos actualizados correctamente",
                status: "success",
                duration: 2000,
              })
            } })
             .catch(error=>console.log(error))
          } else setisError(true)
        }
        }
        >
          <Form>
            <Field name="cityResidence">
              {({ field }) => (
                <FormControl className="formControl" top="20px" left="6">
                  <FormLabel >
                    Ciudad de residencia
                  </FormLabel>
                  <InputGroup >
                  
                  <InputLeftElement
                      pointerEvents="none"
                      children={<FaCity/>}
                    />
                    <Input
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

            <Field name="age">
              {({ field }) => (
                <FormControl className="formControl" top="-112" left="250">
                  <FormLabel  mt="58px">
                    Edad
                  </FormLabel>
                  <InputGroup >
                  
                  <InputLeftElement
                      pointerEvents="none"
                      children={<FaCity/>}
                    />
                    <Input
                      type="number"
                      variant="outline"
                      color="black"
                      bg={"primary.300"}
                      size="md"
                      w="112px"
                      {...field}
                      id="cityResidence"
                      borderRadius="20"
                    />

                    <InputRightAddon
                      children="años"
                      bg="primary.300"
                      right="3"
                      borderRadius="20"
                    />
                  </InputGroup>
                </FormControl>
              )}
            </Field>

            <Field name="height">
              {({ field }) => (
                <FormControl
                  className="formControl"
                  top="-103"
                  left="6"
                >
                  <FormLabel mt="2">
                    Altura
                  </FormLabel>
                  <InputGroup>
                  <InputLeftElement
                      pointerEvents="none"
                      children={<GiPerson/>}
                    />
                    <Input
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
                <FormControl
                  className="formControl"
                  left="250"
                  top="-190"
                >
                  <FormLabel mt="4">
                    Peso
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<GiWeight color="black" />}
                    />
                    <Input
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

            <Field name="country">
              {({ field }) => (
                <FormControl position="relative" bottom="190">
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
                <FormControl
                  className="formControl"
                  position="relative"
                  top="-175px"
                >
                  <FormLabel ml="6" mt="4">
                    Deportes favoritos
                  </FormLabel>
                  <CheckboxGroup colorScheme="primary.300" defaultValue={sportsChecked} >
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
           
            {isError ? (
                <p className="errorComplete">Datos no permitidos</p>
              ) : (
                ""
              )}
            <Button
              position="relative"
              bottom="145px"
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
