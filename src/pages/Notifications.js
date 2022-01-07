import {
  Container,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Checkbox,
  Center,
  Text,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import Header from "../components/Header";
import IsAuth from "../hooks/isAuth";
import { UserNotifications } from "../hooks/notifications";
import { sanitizeCompleteDate } from "../functions/functions";
import { useMutation } from "@apollo/client";
import { UPDATENOTIFICATION } from "../graphql/mutations/updateNotification";
import { Flip } from "react-reveal";
import { Authentication, CompleteProfile } from "../functions/authentication";
import Footer from "../components/Footer";

function Notifications() {
  Authentication();
  CompleteProfile();
  const { me } = IsAuth();
  let dataUser = me?.meExtended;

  const [updateNotification] = useMutation(UPDATENOTIFICATION);

  const { myNotifications, refetchNotifications, loading } = UserNotifications(
    dataUser?.id
  );

  const updateIsSeen = (isSeen, id) => {
    let isSeenVariable;
    if (isSeen) isSeenVariable = false;
    else isSeenVariable = true;
    updateNotification({
      variables: {
        id: id,
        isSeen: isSeenVariable,
      },
    }).then(() => {
      refetchNotifications();
    });
  };

  console.log(myNotifications);

  if (loading || !myNotifications)
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

  if (myNotifications?.notifications?.length > 0)
    return (
      <>
        <Header />
        <Container maxW="container.lg">
          <Table mt="8">
            <Thead>
              <Tr>
                <Th>Leído</Th>
                <Th>Anuncio</Th>
                <Th>Mensaje</Th>
                <Th>Usuario</Th>
                <Th>Fecha</Th>
              </Tr>
            </Thead>
            <Tbody>
              {myNotifications?.notifications.map((notification) => {
                const Date = sanitizeCompleteDate(notification?.created_at);

                return (
                  <Tr>
                    <Td>
                      <Checkbox
                        isChecked={notification?.isSeen}
                        onChange={() => {
                          updateIsSeen(notification?.isSeen, notification?.id);
                        }}
                      />
                    </Td>
                    <Td>
                      {notification?.ad !== null
                        ? notification?.ad?.Name
                        : "Anuncio eliminado"}
                    </Td>
                    <Td>{notification?.Message}</Td>
                    <Td>{notification?.userTransmitter?.username}</Td>
                    <Td>{Date}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Container>
        <Footer />
      </>
    );
  else
    return (
      <>
        <Header />

        <Center h="91vh">
          <Flip left>
            <Text fontSize={{ lg: "4xl", base: "2xl" }}>
              No tienes notificaciones todavía
            </Text>
          </Flip>
        </Center>
        <Footer />
      </>
    );
}

export default Notifications;
