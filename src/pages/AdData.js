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

  const message = `??Tenemos buenas noticias ${adData?.user?.username}!
  El usuario ${dataUser?.username} ha solicitado unirse a tu anuncio (${adData?.Name}).
  Puede consultarlo y ponerte en contacto con ??l en la secci??n de mis anuncios a trav??s de nuestro chat.`;

  const createNewRequest = () => {
    onClose();
    createRequest({
      variables: { adId: adData?.id, userId: dataUser?.id },
    }).then(() => {
      toast({
        title: "Solicitud entregada con ??xito",
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
        title: "Solicitud retirada con ??xito",
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
                  : `data:image/png;base64,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`
              }
              mt="2"
              className="personal-avatar2"
            />

            <Text
              mt="2"
              right={{ base: "73%", lg: "90%" }}
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

        {dataUser?.id === adData?.user?.id ? (
          ""
        ) : isAccepted ? (
          <Button
            p="5"
            colorScheme="red"
            fontSize="20px"
            disabled="true"
            position="fixed"
            left={{ base: "50%", lg: "82%" }}
            mt={{ base: "45%", lg: "15.5%" }}
          >
            Ya has sido aceptado
          </Button>
        ) : !isDateValidate ? (
          <Button
            p="5"
            colorScheme="red"
            fontSize="20px"
            disabled="true"
            position="fixed"
            left={{ base: "45%", lg: "82%" }}
            mt={{ base: "45%", lg: "15.5%" }}
          >
            Anuncio fuera de fecha
          </Button>
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
              ??Est??s seguro de que quieres solicitar unirte a esta oferta?
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
              ??Est??s seguro de que quieres retirar la solicitud?
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
