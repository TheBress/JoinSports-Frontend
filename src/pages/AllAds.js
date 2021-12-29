import { Grid, Center, Spinner, Input, Text, Checkbox } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";
import AdCard from "../components/AdCard";
import Header from "../components/Header";
import { Authentication } from "../functions/authentication";
import { UserAds } from "../hooks/ads";
import IsAuth from "../hooks/isAuth";

function AllAds() {
  Authentication();
  const { myAds, loading } = UserAds();

  const { me } = IsAuth();

  let dataUser = me?.meExtended;

  const [searchTerm, setSearchTerm] = useState("");
  const [isChecked, setisChecked] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangeCheckbox = () => {
    if (isChecked) setisChecked(false);
    else setisChecked(true);
  };

  useEffect(() => {
    const results = myAds?.ads?.filter(
      (ad) =>
        (isChecked && !ad?.user?.id?.includes(dataUser?.id)) ||
        ad?.Name?.includes(searchTerm) ||
        ad?.user?.username?.includes(searchTerm) ||
        ad?.sport?.Name?.includes(searchTerm) ||
        ad?.location?.Name?.includes(searchTerm)
    );

    console.log(dataUser?.id);

    setSearchResults(results);
  }, [searchTerm, myAds?.ads, isChecked, dataUser?.id]);

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
      {}
      <Grid templateColumns="repeat(2,1fr)" gap="10">
        <Input
          mt="5"
          ml="5"
          type="text"
          value={searchTerm}
          placeholder="Nombre de anuncio, deporte , nombre de usuario o localización"
          onChange={handleChange}
        />
        <Checkbox isChecked={isChecked} onChange={handleChangeCheckbox}>
          Mostrar mis anuncios
        </Checkbox>
      </Grid>
      <Grid
        templateColumns={{ lg: "repeat(3, 1fr)", base: "repeat(1, 1fr)" }}
        justifyContent="center"
        textAlign="center"
        gap={5}
      >
        {searchResults?.length > 0 ? (
          searchResults?.map((ad) => {
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
          })
        ) : (
          <Center
            h="86vh"
            textAlign="center"
            w={{ base: "74.6vh", lg: "203.8vh" }}
          >
            <Text fontSize="4xl">No hay anuncios</Text>
          </Center>
        )}
      </Grid>
    </>
  );
}

export default AllAds;
