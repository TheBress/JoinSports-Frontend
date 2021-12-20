import { React } from "react";
import Header from "../components/Header/index";
import { Authentication } from "../functions/authentication";
import CompleteProfile from "../components/CompleteProfile";
import IsAuth from "../hooks/isAuth";
import { Heading, Center, Spinner, Text, Grid } from "@chakra-ui/react";
import Fade from "react-reveal/Fade";
import { LastAds } from "../hooks/ads";
import AdCard from "../components/AdCard";
// import {CarouselHome} from '../components/Carousel';

function Home() {
  Authentication();

  const { me, loading } = IsAuth();
  const { lastAds } = LastAds();
  let dataUser = me?.meExtended;

  const ads = lastAds?.ads;

  console.log(ads);

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
      {dataUser?.cityResidence === null ||
      dataUser?.height === null ||
      dataUser?.weigth === null ||
      dataUser?.nationality === null ||
      dataUser?.favoriteSports.length === 0 ||
      dataUser?.birthDate === null ||
      dataUser?.description === null ? (
        <CompleteProfile dataUser={dataUser} />
      ) : (
        <>
          <Fade left>
            <Heading textAlign="center" mt="8">
              Bienvenido de nuevo, {dataUser?.username}
            </Heading>
          </Fade>
          {/* <CarouselHome/> */}
          <Text>Últimos anuncios</Text>

          <Grid
            templateColumns={{ lg: "repeat(3, 1fr)", base: "repeat(1, 1fr)" }}
            justifyContent="center"
            textAlign="center"
            gap={5}
          >
            {ads?.map((ad) => {
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
            })}
          </Grid>
        </>
      )}
    </>
  );
}

export default Home;
