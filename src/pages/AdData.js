import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { UserAd } from "../hooks/ads";
import {
  Container,
  Image,
  Text,
  Divider,
  Grid,
  Center,
  Spinner,
  Button,
  useDisclosure,
  ModalContent,
  Modal,
  useToast,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { sanitizeDate, validateDate } from "../functions/functions";
import { ViewIcon } from "@chakra-ui/icons";
import { ImLocation } from "react-icons/im";
import { Authentication, CompleteProfile } from "../functions/authentication";
import { CREATEREQUEST } from "../graphql/mutations/createRequest";
import Footer from "../components/Footer";

import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import IsAuth from "../hooks/isAuth";
import { DELETEREQUEST } from "../graphql/mutations/deleteRequest";
import { CREATENOTIFICATION } from "../graphql/mutations/createNotification";
import { DELETE_NOTIFICATION } from "../graphql/mutations/deleteNotification";

import EditAd from "../components/EditAd";
import { UserNotifications } from "../hooks/notifications";

function AdData() {
  Authentication();
  CompleteProfile();
  const { me } = IsAuth();
  const { id } = useParams();
  const { Ad, loadingAd, refetchAd } = UserAd(id);
  const toast = useToast();
  let adData = Ad?.ads[0];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();

  const {
    isOpen: isOpen4,
    onOpen: onOpen4,
    onClose: onClose4,
  } = useDisclosure();

  const [createRequest, { loading: loadingCreate }] =
    useMutation(CREATEREQUEST);
  const [deleteRequest, { loading: loadingDelete }] =
    useMutation(DELETEREQUEST);
  const [createNotification] = useMutation(CREATENOTIFICATION);
  const [deleteNotification] = useMutation(DELETE_NOTIFICATION);

  let isSolicited = false,
    idReuqest;
  const dataUser = me?.meExtended;
  const { refetchNotifications } = UserNotifications(dataUser?.id);

  const [idNotification, setidNotification] = useState("");
  adData?.requests?.forEach((request) => {
    if (request?.user?.id === dataUser?.id) {
      idReuqest = request?.id;
      isSolicited = true;
    }
  });

  useEffect(() => {
    adData?.notifications?.forEach((notification) => {
      if (
        notification?.ad?.id === adData?.id &&
        notification?.userReceptor?.id === adData?.user?.id &&
        notification?.userTransmitter?.id === dataUser?.id
      ) {
        setidNotification(notification?.id);
      }
    });
  }, [
    adData?.notifications,
    idNotification,
    adData?.id,
    adData?.user?.id,
    dataUser?.id,
  ]);

  let isAccepted = false;

  adData?.requests?.forEach((request) => {
    if (request?.isAccepted && request?.user?.id === dataUser?.id)
      isAccepted = true;
  });

  const history = useHistory();

  const message = `¡Tenemos buenas noticias ${adData?.user?.username}!
  El usuario ${dataUser?.username} ha solicitado unirse a tu anuncio (${adData?.Name}).
  Puede consultarlo y ponerte en contacto con él en la sección de mis anuncios a través de nuestro chat.
  JoinSports`;

  const createNewRequest = () => {
    onClose();
    createRequest({
      variables: { adId: adData?.id, userId: dataUser?.id },
    }).then(() => {
      toast({
        title: "Solicitud entregada con éxito",
        status: "success",
        duration: 2000,
      });

      createNotification({
        variables: {
          message: message,
          userTransmitter: dataUser?.id,
          userReceptor: adData?.user?.id,
          ad: adData?.id,
        },
      }).then(() => {
        refetchNotifications();
        refetchAd();
      });
    });
  };

  const color = useColorModeValue("black", "white");

  const deleteNewRequest = () => {
    onClose2();
    deleteRequest({
      variables: { id: idReuqest },
    }).then(() => {
      toast({
        title: "Solicitud retirada con éxito",
        status: "success",
        duration: 2000,
      });

      deleteNotification({
        variables: { id: idNotification },
      }).then(() => {
        refetchAd();
        refetchNotifications();
      });
    });
  };

  const user = () => {
    history.push(`/user/${adData?.user?.id}`);
  };

  const date = sanitizeDate(adData?.Date);

  let isDateValidate = validateDate(date);

  let isAcceptedUsers = 0,
    notAcceptedUsers = 0;

  adData?.requests?.forEach((request) => {
    if (request?.isAccepted) isAcceptedUsers++;
    else notAcceptedUsers++;
  });

  if (loadingAd || !Ad)
    return (
      <Center
        h="100vh"
        w="203.8vh"
        zIndex="2"
        position="absolute"
        bg="black"
        opacity={0.5}
      >
        <Spinner size="xl" />
      </Center>
    );

  if (dataUser?.id !== adData?.user?.id) {
    return (
      <>
        <Header />

        {loadingDelete || loadingCreate ? (
          <Center
            h="220%"
            w="100%"
            zIndex="2"
            position="absolute"
            bg="black"
            opacity={0.5}
          >
            <Spinner size="xl" />
          </Center>
        ) : (
          ""
        )}
        <Container maxW="container.xl" h="52vh">
          <Grid
            templateColumns="repeat(2,1fr)"
            cursor="pointer"
            _hover={{ textDecoration: `underline ${color}` }}
            onClick={user}
          >
            <Image
              src={
                adData?.user?.image !== "" && adData?.user?.image !== null
                  ? `https://joinsports.s3.eu-west-3.amazonaws.com/${adData?.user?.image}`
                  : "https://media.istockphoto.com/photos/no-sign-picture-id178553688?k=20&m=178553688&s=612x612&w=0&h=N71pIRjPQ7Gb8dUmjVTC57oIOuTr_FuCQjZsbCXKAAI="
              }
              mt="2"
              className="personal-avatar2"
            />

            <Text
              mt="2"
              right={{ base: "74%", lg: "91%" }}
              fontSize="3xl"
              position="relative"
            >
              {adData?.user?.username}
            </Text>
          </Grid>

          <Image
            src={
              adData?.image !== ""
                ? `https://joinsports.s3.eu-west-3.amazonaws.com/${adData?.image}`
                : `https://joinsports.s3.eu-west-3.amazonaws.com/logo.png`
            }
            m="auto"
            mt="3"
            w="100%"
            h="90%"
          />

          <Stack h={{ lg: "43vh", base: "auto" }}>
            <Text textAlign="center" fontSize="5xl" mt="2">
              {adData?.Name}
            </Text>

            <Divider colorScheme="white" mt="2" />

            <Text textAlign="center" fontSize="2xl" mt="2">
              {adData?.Description}
            </Text>

            <Divider colorScheme="white" mt="2" />

            <Grid
              templateColumns={{ lg: "repeat(3, 1fr)", base: "repeat(2, 1fr)" }}
            >
              <Text textAlign="center" fontSize="xl" mt="2">
                {date}
              </Text>

              <Text textAlign="center" fontSize="xl" mt="2">
                {adData?.sport?.Name}
              </Text>

              <Grid
                templateColumns="repeat(3, 1fr)"
                w={{ base: "160%", lg: "auto" }}
                gap={{ base: "5", lg: "1" }}
              >
                <Text textAlign="center" fontSize="xl" mt="2">
                  {adData?.views}
                  <ViewIcon ml="2" />
                </Text>

                <Text textAlign="center" fontSize="xl" mt="2">
                  {notAcceptedUsers}{" "}
                  {notAcceptedUsers !== 1 ? "solicitudes" : "solicitud"}
                </Text>

                <Text
                  textAlign="center"
                  onClick={onOpen4}
                  fontSize="xl"
                  mt="2"
                  cursor="pointer"
                  _hover={{ textDecoration: `underline ${color}` }}
                >
                  {isAcceptedUsers}{" "}
                  {isAcceptedUsers !== 1 ? "aceptados" : "aceptado"}
                </Text>
              </Grid>
            </Grid>
            <Divider colorScheme="white" mt="2" />
            <Text textAlign="center" fontSize="xl" h="12vh">
              <ImLocation className="location" />
              {`${adData?.location?.Direction} (${adData?.location?.Name})`}
            </Text>
            <Footer />
          </Stack>
        </Container>

        {dataUser?.id === adData?.user?.id || isAccepted || !isDateValidate ? (
          ""
        ) : !isSolicited ? (
          <Button
            onClick={onOpen}
            p="5"
            colorScheme="red"
            fontSize="20px"
            position="fixed"
            left={{ base: "70%", lg: "90%" }}
            mt={{ base: "45%", lg: "15.5%" }}
          >
            Solicitar
          </Button>
        ) : (
          <Button
            onClick={onOpen2}
            p="5"
            colorScheme="red"
            fontSize="20px"
            position="fixed"
            left={{ base: "55%", lg: "84%" }}
            mt={{ base: "45%", lg: "15.5%" }}
          >
            Retirar solicitud
          </Button>
        )}

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent
            h="200px"
            w="1000px"
            textAlign="center"
            position="relative"
            top="25%"
          >
            <Text fontSize="xl" m="2">
              ¿Estás seguro de que quieres solicitar unirte a esta oferta?
            </Text>
            <Grid templateColumns="repeat(2,1fr)" mt="10%" gap="10">
              <Button onClick={createNewRequest} colorScheme="green" ml="5">
                Enviar
              </Button>
              <Button onClick={onClose} colorScheme="red" mr="5">
                Cancelar
              </Button>
            </Grid>
          </ModalContent>
        </Modal>

        <Modal isOpen={isOpen2} onClose={onClose2}>
          <ModalContent
            h="200px"
            w="1000px"
            textAlign="center"
            position="relative"
            top="25%"
          >
            <Text fontSize="xl" m="2">
              ¿Estás seguro de que quieres retirar la solicitud?
            </Text>
            <Grid templateColumns="repeat(2,1fr)" mt="10%" gap="10">
              <Button onClick={deleteNewRequest} colorScheme="green" ml="5">
                Retirar
              </Button>
              <Button onClick={onClose2} colorScheme="red" mr="5">
                Cancelar
              </Button>
            </Grid>
          </ModalContent>
        </Modal>

        <Modal isOpen={isOpen4} onClose={onClose4}>
          <ModalContent
            overflow="auto"
            h="auto"
            textAlign="center"
            position="relative"
            top="25%"
          >
            <Text fontSize="xl" m="2">
              Usuarios aceptados
            </Text>
            <Grid
              textAlign="center"
              mb="3"
              gap="4"
              h={isAcceptedUsers > 2 && "100px"}
              overflow={isAcceptedUsers > 2 && "auto"}
            >
              {isAcceptedUsers !== 0 ? (
                adData?.requests?.map((request) => {
                  if (request?.isAccepted) {
                    return (
                      <Text
                        _hover={{ textDecoration: `underline ${color}` }}
                        ml="3"
                        cursor="pointer"
                        onClick={() => {
                          history.push(`/user/${request?.user?.id}`);
                        }}
                      >{`${request?.user?.username}`}</Text>
                    );
                  }
                  return "a";
                })
              ) : (
                <Text>No hay usuarios aceptados</Text>
              )}
            </Grid>
            <Button
              colorScheme="red"
              onClick={onClose4}
              m="auto"
              mt="5"
              mb="5"
              w="200px"
            >
              Cerrar
            </Button>
          </ModalContent>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <EditAd
          username={adData?.user?.username}
          views={adData?.views}
          requests={adData?.requests}
          id={adData?.id}
          userId={adData?.user?.id}
          userImage={adData?.user?.image}
          date={adData?.Date}
          name={adData?.Name}
          description={adData?.Description}
          image={adData?.image}
          locationId={adData?.location?.id}
          sportId={adData?.sport?.id}
        />
      </>
    );
  }
}

export default AdData;
