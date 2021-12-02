import {React,useState} from "react";
import Header from "../components/Header/index";
import { Authentication } from "../functions/authentication";
import {
  Center,
  Stack,
  Heading,
  Flex,
  Avatar,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightAddon,
  CheckboxGroup,
  Checkbox,
  Button,
  useToast,
  useColorModeValue
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import { Form, Formik, Field } from "formik";
import { FaCity, FaFlag } from "react-icons/fa";
import { GiWeight, GiPerson } from "react-icons/gi";
import useSports from "../hooks/sports";
import IsAuth from "../hooks/isAuth";
import { useMutation } from "@apollo/client";
import {UPDATEPROFILE} from "../graphql/mutations/updateProfile"
import {ISAUTH} from "../graphql/queries/isAuth"

function Profile() {
  Authentication();
  const {sports}=useSports();
  const {me}=IsAuth();
  const toast=useToast();
  let dataUser,sportsChecked=[];
  const [isError, setisError] = useState(false);
  const bg = useColorModeValue("black","white")
  const color = useColorModeValue("white","black")
  const [updateProfile]=useMutation(UPDATEPROFILE,{
    refetchQueries:[
      ISAUTH
    ]
  })


  
 dataUser = me?.meExtended;


  dataUser?.favoriteSports.map(fsport=>{
    sportsChecked.push(fsport.id)
    return "a";
  })

  console.log(sportsChecked);
  
  return (
    <>
      <Header />
      <Center h="90vh">
        <Formik
          initialValues={{
            cityResidence: dataUser?.cityResidence,
            height: dataUser?.height,
            weigth: dataUser?.weigth,
            sports: dataUser?.favoriteSports.map(fsport=>{return fsport.id}),
          }}
          onSubmit={(values) => {
            console.log(values);
            if(values.height>=145 && values.height<=230 &&values.weigth>=40 && values.weigth<170 && values.sports.length>0
              && values.cityResidence!==""){
                setisError(false)
                updateProfile({
                  variables:{
                    id:dataUser?.id,
                    cityResidence:values.cityResidence,
                    height:values.height,
                    weigth:values.weigth,
                    favoriteSports:values.sports
                  }
                }).then(
                  toast({
                    title: "Datos actualizados correctamente",
                    status: "success",
                    duration: 2000,
                  })
                )
              }else setisError(true)
          }}
        >
          <Form>
            <Stack
              borderRadius="20"
              bg={bg}
              color={color}
              justify="center"
              h={{lg:"80vh",base:"80vh"}}
              w={{lg:"73vh",base:"60vh"}}
              align="center"
            >
              <Heading size="xl" zIndex="1" position="relative" top="-50px" >
                Tu perfil
              </Heading>
              <Flex>
                <Avatar
                position="relative" 
                  top="-50px"
                  size="md"
                  right="3"
                  name={dataUser?.username}
                  src={dataUser?.image?.name}
                />
                <Heading size="lg" zIndex="1" position="relative" top="-45px"  >
                  {dataUser?.username}
                </Heading>
              </Flex>

          <Flex position="relative" bottom="10">
              <FormControl>
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<EmailIcon color="black" />}
                  />
                  <Input
                    value={dataUser?.email}
                    w={{lg:"290px",base:"230px"}}
                    isDisabled={true}
                    variant="outline"
                    color="black"
                    bg="primary.300"
                    size="md"
                    id="email"
                    mr="4"
                    borderRadius="20"
                  />
                </InputGroup>
              </FormControl>

              <Field name="cityResidence">
                {({ field }) => (
                  <FormControl  >
                    <FormLabel>Ciudad de residencia</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<FaCity />}
                      />
                      <Input
                        value={dataUser?.email}
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
              </Flex>

              <Flex position="relative" bottom="8">
              <FormControl mr="10">
                <FormLabel>Edad</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FaCity />}
                  />
                  <Input
                    value={dataUser?.age}
                    left={{base:"0px"}}
                    type="number"
                    variant="outline"
                    color="black"
                    bg="primary.300"
                    size="md"
                    w="80px"
                    isDisabled={true}
                    borderRadius="20"
                  />

                  <InputRightAddon
                    children="años"
                    bg="primary.400"
                    right="3"
                    borderRadius="20"
                  />
                </InputGroup>
              </FormControl>

              <Field name="height">
                {({ field }) => (
                  <FormControl >
                    <FormLabel>Altura</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<GiPerson />}
                      />
                      <Input
                        type="number"
                        variant="outline"
                        w="90px"
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
              </Flex>

              <Flex position="relative" bottom="6">
              <Field name="weigth">
                {({ field }) => (
                  <FormControl mr={{lg:"10",base:"4"}}>
                    <FormLabel>Peso</FormLabel>
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

              <FormControl>
                <FormLabel>País de nacimiento</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FaFlag color="black" />}
                  />
                  <Input
                    value={dataUser?.nationality}
                    w="220px"
                    isDisabled={true}
                    variant="outline"
                    color="black"
                    bg={"primary.300"}
                    size="md"
                    borderRadius="20"
                  />
                </InputGroup>
              </FormControl>
              </Flex>

                <Flex>
              <Field name="sports">
                {({ field }) => (
                  <FormControl>
                    <FormLabel>
                      Deportes favoritos
                    </FormLabel>
                    <CheckboxGroup
                      colorScheme="primary.300"
                      defaultValue={sportsChecked}
                    >
                       {sports?.sports.map((sport) => {
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
                    </Flex>
              {isError ? (
                <p className="errorComplete">Datos no permitidos</p>
              ) : (
                ""
              )}


              <Button
              position="relative"
              top="30px"
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

            </Stack>
          </Form>
        </Formik>
      </Center>
    </>
  );
}

export default Profile;
