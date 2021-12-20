import { Grid, Center, Spinner } from "@chakra-ui/react";
import React from "react";
import { Fade } from "react-reveal";
import AdCard from "../components/AdCard";
import Header from "../components/Header";
import { UserAds } from "../hooks/ads";
import IsAuth from "../hooks/isAuth";

function AllAds() {
  const { me } = IsAuth();
  const { myAds, loading } = UserAds();

  if (loading)
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
      <Grid
        templateColumns={{ lg: "repeat(3, 1fr)", base: "repeat(1, 1fr)" }}
        justifyContent="center"
        textAlign="center"
        gap={5}
      >
        {myAds?.ads.map((ad) => {
          if (me?.meExtended.id !== ad.user.id) {
            return (
              <Fade left>
                <AdCard
                  edit={false}
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
          }
        })}
      </Grid>
    </>
  );
}

export default AllAds;
