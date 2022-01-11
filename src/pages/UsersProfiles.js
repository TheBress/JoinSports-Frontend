import {
  Container,
  Grid,
  Image,
  Text,
  Center,
  Spinner,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import AdCard from "../components/AdCard";
import Header from "../components/Header";
import { calculateDate } from "../functions/functions";
import { GetUser } from "../hooks/users";
import { Authentication, CompleteProfile } from "../functions/authentication";
import Footer from "../components/Footer";

function UsersProfiles() {
  Authentication();
  CompleteProfile();
  const { id } = useParams();
  const { User, loading } = GetUser(id);

  const user = User?.user;
  const age = calculateDate(user?.birthDate);

  if (loading || !User)
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

  return (
    <>
      <Header />

      <Container maxW="container.xl" h="50vh" mt="6">
        <Grid templateColumns="repeat(2,12vh)" flexDirection="row">
          <Image
            src={
              user?.image !== null &&
              user?.image !== "" &&
              `https://joinsports.s3.eu-west-3.amazonaws.com/${user?.image}`
            }
            mt="2"
            cursor="default"
            className="personal-avatar"
          />

          <Text fontSize="4xl" w={{ base: "380%", lg: "1000%" }} ml="2" mt="4">
            {user?.username} ({user?.email})
          </Text>
        </Grid>

        <Divider colorScheme="white" mt="4" />

        <Text fontSize="3xl" ml="2" mt="4">
          {user?.description}
        </Text>

        <Divider colorScheme="white" mt="4" />

        <Grid templateColumns="repeat(3,1fr)" textAlign="center">
          <Text fontSize="2xl" ml="2" mt="4">
            Ciudad de residencia: {user?.cityResidence}
          </Text>
          <Text fontSize="2xl" ml="2" mt="4">
            País de nacimiento: {user?.nationality}
          </Text>
          <Text fontSize="2xl" ml="2" mt="4">
            Edad: {age} años
          </Text>
        </Grid>

        <Divider colorScheme="white" mt="4" />

        <Grid templateColumns="repeat(3,1fr)" textAlign="center">
          <Text fontSize="2xl" ml="2" mt="4">
            Peso: {user?.weigth} kg
          </Text>
          <Text fontSize="2xl" ml="2" mt="4">
            Sexo: {user?.sex}
          </Text>
          <Text fontSize="2xl" ml="2" mt="4">
            Altura: {user?.height} cm
          </Text>
        </Grid>

        <Divider colorScheme="white" mt="4" />
        <Text fontSize="2xl" mt="2" textAlign="center">
          Deportes favoritos
        </Text>
        <Grid
          templateColumns={
            user?.favoriteSports?.length <= 3
              ? `repeat(${user?.favoriteSports?.length},auto)`
              : "repeat(3,auto)"
          }
          textAlign="center"
        >
          {user?.favoriteSports?.map((sport) => {
            return (
              <Text fontSize="2xl" ml="2" mt="4">
                {sport?.Name}
              </Text>
            );
          })}
        </Grid>

        <Divider colorScheme="white" mt="4" />

        {user?.ads?.length > 0 ? (
          <>
            <Text fontSize="2xl" ml="2" mt="4" textAlign="center">
              Anuncios
            </Text>

            <Grid
              templateColumns={{ lg: "repeat(3, 1fr)", base: "repeat(1, 1fr)" }}
              justifyContent="center"
              textAlign="center"
              gap={5}
            >
              {user?.ads?.map((ad) => {
                return (
                  <AdCard
                    edit={false}
                    key={ad.id}
                    id={ad.id}
                    name={ad.Name}
                    userId={ad.user.id}
                    user={ad.user.username}
                    image={
                      ad.image !== ""
                        ? `https://joinsports.s3.eu-west-3.amazonaws.com/${ad.image}`
                        : `https://joinsports.s3.eu-west-3.amazonaws.com/logo.png`
                    }
                    userImage={ad.user.image}
                    description={ad.Description}
                    locationId={ad.location.id}
                    fullLocation={`${ad.location.Direction} (${ad.location.Name})`}
                    requests={ad.requests}
                    date={ad.Date}
                    sport={ad.sport.Name}
                    sportId={ad.sport.id}
                    views={ad.views}
                  />
                );
              })}
            </Grid>
          </>
        ) : (
          <Text fontSize="2xl" ml="2" mt="4" h="10vh" textAlign="center">
            No tiene anuncios
          </Text>
        )}
        <Footer />
      </Container>
    </>
  );
}

export default UsersProfiles;
