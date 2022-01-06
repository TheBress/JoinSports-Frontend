import { React } from "react";
import Header from "../components/Header/index";
import { Authentication } from "../functions/authentication";
import CompleteProfile from "../components/CompleteProfile";
import IsAuth from "../hooks/isAuth";
import {
  Heading,
  Center,
  Spinner,
  Text,
  Grid,
  Container,
} from "@chakra-ui/react";
import Fade from "react-reveal/Fade";
import { LastAds } from "../hooks/ads";
import CarouselHome from "../components/Carousel";
import AdCard from "../components/AdCard";
import { GetLatestUsers } from "../hooks/users";
import ProfileCard from "../components/ProfileCard";
import { UserNotifications } from "../hooks/notifications";

function Home() {
  Authentication();

  const { me, loading } = IsAuth();
  const { lastAds } = LastAds();
  const { LatestUsers } = GetLatestUsers();
  let dataUser = me?.meExtended;

  const { loadingNotification } = UserNotifications(dataUser?.id);

  const ads = lastAds?.ads;
  const users = LatestUsers?.users;

  if (loading || loadingNotification)
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
      dataUser?.description === null ||
      dataUser?.sex === null ? (
        <CompleteProfile dataUser={dataUser} />
      ) : (
        <>
          <Fade left>
            <Heading textAlign="center" mt="6" mb="6">
              Bienvenido de nuevo, {dataUser?.username}
            </Heading>
            <CarouselHome />
          </Fade>

          <Container maxW="container.xl">
            <Text fontSize="2xl" mt="5">
              Últimos anuncios
            </Text>

            <Grid
              templateColumns={{
                lg: "repeat(3, 1fr)",
                base: "repeat(1, 1fr)",
              }}
              justifyContent="center"
              textAlign="center"
              gap={5}
            >
              {ads?.map((ad) => {
                return (
                  <Fade left>
                    <AdCard
                      edit={false}
                      isHome={true}
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

            <Text fontSize="2xl" mt="5">
              Últimos usuarios registrados
            </Text>

            <Grid
              templateColumns={{
                lg: "repeat(3, 1fr)",
                base: "repeat(1, 1fr)",
              }}
              justifyContent="center"
              textAlign="center"
              gap={5}
            >
              {users?.map((user) => {
                return (
                  <ProfileCard
                    id={user?.id}
                    name={user?.username}
                    email={user?.email}
                    description={user?.description}
                    sports={user?.favoriteSports}
                    image={user?.image}
                  />
                );
              })}
            </Grid>
          </Container>
        </>
      )}
    </>
  );
}

export default Home;
