import {
  Grid,
  Center,
  Spinner,
  Input,
  Text,
  Checkbox,
  RadioGroup,
  Radio,
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";
import AdCard from "../components/AdCard";
import Header from "../components/Header";
import { Authentication } from "../functions/authentication";
import { UserAds } from "../hooks/ads";
import IsAuth from "../hooks/isAuth";
import { FaFilter } from "react-icons/fa";

function AllAds() {
  Authentication();
  const { myAds, loading } = UserAds();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { me } = IsAuth();

  let dataUser = me?.meExtended;

  const [searchTerm, setSearchTerm] = useState("");
  const [isChecked, setisChecked] = useState(false);
  const [value, setValue] = useState("1");
  const [value2, setValue2] = useState("");

  const [searchResults, setSearchResults] = useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangeCheckbox = () => {
    if (isChecked) setisChecked(false);
    else setisChecked(true);
  };

  const restartFilters = () => {
    setValue("1");
    setValue2("");
    setSearchTerm("");
    setisChecked(false);
  };

  useEffect(() => {
    let myAdsList = myAds?.ads?.filter(
      (ad) => !isChecked && !ad?.user?.id?.includes(dataUser?.id)
    );

    isChecked && (myAdsList = myAds?.ads);

    const results = myAdsList?.filter(
      (ad) =>
        ad?.user?.username?.includes(searchTerm) ||
        ad?.sport?.Name?.includes(searchTerm) ||
        ad?.location?.Name?.includes(searchTerm) ||
        ad?.Name?.includes(searchTerm)
    );

    if (value === "1") {
      if (value2 === "1") {
        results?.sort(function (a, b) {
          return b?.requests?.length - a?.requests?.length;
        });
      } else if (value2 === "2") {
        results?.sort(function (a, b) {
          return a?.requests?.length - b?.requests?.length;
        });
      }
    } else if (value === "2") {
      results?.sort(function (a, b) {
        return a?.views - b?.views;
      });

      if (value2 === "1") {
        results?.sort(function (a, b) {
          return b?.requests?.length - a?.requests?.length;
        });
      } else if (value2 === "2") {
        results?.sort(function (a, b) {
          return a?.requests?.length - b?.requests?.length;
        });
      }
    }

    setSearchResults(results);
  }, [searchTerm, myAds?.ads, isChecked, dataUser?.id, value, value2]);

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
      <Button
        ref={btnRef}
        colorScheme="red"
        mt="8"
        ml="3"
        position="fixed"
        zIndex="5"
        onClick={onOpen}
      >
        <FaFilter color="black" />
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filtros</DrawerHeader>

          <DrawerBody>
            <Checkbox
              mt="5"
              mb="5"
              isChecked={isChecked}
              onChange={handleChangeCheckbox}
            >
              Mostrar mis anuncios
            </Checkbox>

            <Input
              mb="5"
              type="text"
              value={searchTerm}
              placeholder="Nombre de anuncio, deporte , nombre de usuario o localización"
              onChange={handleChange}
            />

            <RadioGroup onChange={setValue} value={value} mb="5">
              Visitas:
              <Radio ml="2" value="1">
                Desc.
              </Radio>
              <Radio ml="2" value="2">
                Asc.
              </Radio>
            </RadioGroup>

            <RadioGroup onChange={setValue2} value={value2} mb="5">
              Solicitudes:
              <Radio ml="2" value="1">
                Desc.
              </Radio>
              <Radio ml="2" value="2">
                Asc.
              </Radio>
            </RadioGroup>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={restartFilters}>
              Reiniciar filtros
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

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
