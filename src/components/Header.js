import React from "react";
import { Flex, Center, Container,Image } from "@chakra-ui/react";

function Header() {
  return (
    <Container h="100vh" bg="grey">
      <Flex bg="black" h="100">
        <Center p="2">
        <Image src="logo.png" alt="logo" h="120"/>
        </Center>
      </Flex>
    </Container>
  );
}

export default Header;
