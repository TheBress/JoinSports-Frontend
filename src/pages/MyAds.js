import { Grid } from "@chakra-ui/react";
import React from "react";
import AdCard from "../components/AdCard";
import Header from "../components/Header";
import { Authentication } from "../functions/authentication";
import IsAuth from "../hooks/isAuth";
import { UserAds } from "../hooks/ads";
import { Spinner, Center, Text } from "@chakra-ui/react";
import { Fade, Flip } from "react-reveal";
import { Link } from "react-router-dom";

function MyAds() {
  Authentication();
  const { me } = IsAuth();
  const { myAds, loading } = UserAds(me?.meExtended.id);

  let isAcceptedAds = [];

  me?.meExtended?.requests?.forEach((request) => {
    if (request?.isAccepted) isAcceptedAds.push(request?.ad);
  });

  console.log(isAcceptedAds);

  if (loading || !myAds)
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
      {myAds?.ads.length !== 0 && (
        <Text fontSize="3xl" ml="10" mt="4">
          Tus anuncios
        </Text>
      )}
      <Grid
        templateColumns={{ lg: "repeat(3, 1fr)", base: "repeat(1, 1fr)" }}
        justifyContent="center"
        textAlign="center"
        gap={5}
      >
        {myAds?.ads.length !== 0 &&
          myAds?.ads.map((ad) => {
            return (
              <Fade left>
                <AdCard
                  edit={true}
                  key={ad.id}
                  id={ad.id}
                  name={ad.Name}
                  userId={ad.user.id}
                  user={ad.user.username}
                  image="logo.png"
                  // image={`https://joinsports.s3.eu-west-3.amazonaws.com/${ad.image}`} ruta buena de amazon s3
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
              </Fade>
            );
          })}
      </Grid>

      {myAds?.ads.length !== 0 && (
        <Text fontSize="3xl" ml="10" mt="4">
          Anuncios aceptados
        </Text>
      )}

      <Grid
        templateColumns={{ lg: "repeat(3, 1fr)", base: "repeat(1, 1fr)" }}
        justifyContent="center"
        textAlign="center"
        gap={5}
      >
        {isAcceptedAds !== 0 &&
          isAcceptedAds?.map((ad) => {
            return (
              <Fade left>
                <AdCard
                  edit={true}
                  key={ad.id}
                  id={ad.id}
                  name={ad.Name}
                  userId={ad.user.id}
                  user={ad.user.username}
                  image="logo.png"
                  // image={`https://joinsports.s3.eu-west-3.amazonaws.com/${ad.image}`} ruta buena de amazon s3
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
              </Fade>
            );
          })}
      </Grid>

      {isAcceptedAds === 0 && myAds?.ads.length === 0 && (
        <Center
          justifyContent="center"
          textAlign="center"
          h="91.5vh"
          w="209.2vh"
        >
          <Flip left>
            <Text fontSize="3xl">
              No tienes anuncios (puedes crearlos pinchando{" "}
              <Link className="link" to="/createad">
                {" "}
                aquí
              </Link>
              )
            </Text>
          </Flip>
        </Center>
      )}
    </>
  );
}

export default MyAds;
