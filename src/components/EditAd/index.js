import { React, useState } from "react";
import {
  Modal,
  ModalContent,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Textarea,
  InputLeftElement,
  Select,
  Flex,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik, Field } from "formik";
import { BsFillCalendarDateFill } from "react-icons/bs";
import useSports from "../../hooks/sports";
import useLocations from "../../hooks/locations";
import NewLocation from "../NewLocation";
import { useMutation } from "@apollo/client";
import { DELETEAD } from "../../graphql/mutations/deleteAd";
import { UPDATEAD } from "../../graphql/mutations/updateAd";
import { GETADS, GET_LAST_ADS } from "../../graphql/queries/getAds";
import { GETEVENTSCALENDAR } from "../../graphql/queries/getEventsCalendar";
import { DELETE_EVENT_CALENDAR } from "../../graphql/mutations/deleteEventCalendar";
import { UPDATEEVENT } from "../../graphql/mutations/updateEvent";
import { UserAds } from "../../hooks/ads";
import { validateDate } from "../../functions/functions";
import { UserEventsCalendar } from "../../hooks/eventsCalendar";
import { GetUser } from "../../hooks/users";

function EditAd(props) {
  const { refetchAds } = UserAds(props.props.userId);
  const [isOpen, setisOpen] = useState(true);
  const [isOpenLocation, setisOpenLocation] = useState(false);
  const { refetchEvents } = UserEventsCalendar(props.props.userId);
  const { refetchUser } = GetUser(props.props.userId);

  const { sports } = useSports();
  const toast = useToast();
  const { locations } = useLocations();
  const [deleteAd] = useMutation(DELETEAD, {
    refetchQueries: [{ query: GETADS }, { query: GET_LAST_ADS }],
  });
  const [updateAd] = useMutation(UPDATEAD, {
    refetchQueries: [{ query: GETADS }, { query: GET_LAST_ADS }],
  });
  const [deleteEvent] = useMutation(DELETE_EVENT_CALENDAR, {
    refetchQueries: [{ query: GETEVENTSCALENDAR }],
  });
  const [updateEvent] = useMutation(UPDATEEVENT, {
    refetchQueries: [{ query: GETEVENTSCALENDAR }],
  });
  const { eventsCalendar } = UserEventsCalendar(
    props.props.userId,
    props.props.date,
    props.props.date,
    props.props.name
  );
  const [isError, setisError] = useState(false);

  let idEvent = eventsCalendar?.eventsCalendars[0]?.id;

  const nLocation = () => {
    setisOpenLocation(true);
  };

  const deleteAds = () => {
    deleteEvent({
      variables: {
        id: idEvent,
      },
    });
    deleteAd({
      variables: {
        id: props.props.id,
      },
    }).then(() => {
      setisOpen(false);
      refetchAds();
      refetchEvents();
      refetchUser();
    });
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalContent
        bg="white"
        color="black"
        textAlign="center"
        h="632px"
        borderRadius="20"
        position="relative"
        top="9"
      >
        <Heading mt="2">Edita tu anuncio</Heading>
        <Text mt="2">Introduce los datos para editar tu anuncio</Text>

        <Formik
          initialValues={{
            name: props.props.name,
            description: props.props.description,
            date: props.props.date,
            sport: props.props.sportId,
            location: props.props.locationId,
          }}
          onSubmit={(values) => {
            let isDateValidate = validateDate(values.date);
            if (
              values.name !== "" &&
              values.description !== "" &&
              values.sport !== "" &&
              values.location !== "" &&
              isDateValidate
            ) {
              updateEvent({
                variables: {
                  id: idEvent,
                  from: values.date,
                  to: values.date,
                  title: values.name,
                },
              });
              updateAd({
                variables: {
                  id: props.props.id,
                  name: values.name,
                  date: values.date,
                  description: values.description,
                  sport: values.sport,
                  location: values.location,
                },
              }).then(() => {
                setisOpen(false);
                toast({
                  title: "Datos actualizados correctamente",
                  status: "success",
                  duration: 2000,
                });
              });
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

            <Field name="description">
              {({ field }) => (
                <FormControl>
                  <FormLabel mt="7" ml="5">
                    Descripción
                  </FormLabel>
                  <Textarea ml="5" mr="5" bg="primary.300" w="90%" {...field} />
                </FormControl>
              )}
            </Field>

            <Field name="date">
              {({ field }) => (
                <FormControl ml="4">
                  <FormLabel>Fecha</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<BsFillCalendarDateFill color="black" />}
                    />
                    <Input
                      mb={2}
                      type="datetime-local"
                      variant="outline"
                      color="black"
                      w="415px"
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
                  <FormLabel ml="4">Deporte</FormLabel>
                  <Select
                    ml="5"
                    mr="5"
                    bg="primary.300"
                    color="black"
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
                  <FormLabel ml="4">Localización</FormLabel>
                  <Text
                    visibility={!isOpen ? "visible" : "hidden"}
                    cursor="pointer"
                    mt={-8}
                    ml="50%"
                    onClick={nLocation}
                  >
                    Añadir nueva localización
                  </Text>

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

                  {isOpenLocation && <NewLocation isOpen={isOpen} />}
                </FormControl>
              )}
            </Field>

            {isError ? (
              <Text color="red" textAlign="center" position="relative" top="2">
                Datos no permitidos
              </Text>
            ) : (
              ""
            )}

            <Flex justify="center" position="relative" bottom="6">
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
                Guardar cambios
              </Button>

              <Button
                onClick={deleteAds}
                top="58px"
                color="white"
                fontSize="25"
                p="5"
                borderRadius="20"
                colorScheme="primary.100"
                variant="solid"
                bg="primary.200"
              >
                Eliminar
              </Button>
            </Flex>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
}

export default EditAd;
