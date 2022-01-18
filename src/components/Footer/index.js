import { Box, Image, Stack, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { Copyright } from "./Copyrigth";

function Footer(props) {
  let color1,
    color2 = "";

  if (props.isCalendar) {
    color1 = "white";
    color2 = "white";
  } else {
    color1 = "white";
    color2 = "black";
  }
  const color = useColorModeValue(color1, color2);

  return (
    <Box
      as="footer"
      role="contentinfo"
      mx="auto"
      bg={props.isCalendar && "white"}
      maxW={props.isCalendar ? "" : "7xl"}
      py="12"
      px={{ base: "4", md: "8" }}
    >
      <Stack>
        <Stack
          direction="row"
          spacing="4"
          align="center"
          justify="space-between"
        >
          <Image
            position={props.isCalendar && "relative"}
            left={props.isCalendar && "6%"}
            src={
              color !== "white"
                ? "https://joinsports.s3.eu-west-3.amazonaws.com/logo.png"
                : "https://joinsports.s3.eu-west-3.amazonaws.com/logodark.png"
            }
            w="200px"
          />
        </Stack>
        <Copyright alignSelf="start" color={props.isCalendar && "black"} />
      </Stack>
    </Box>
  );
}

export default Footer;
