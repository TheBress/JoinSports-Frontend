import { Box, Image, Stack } from "@chakra-ui/react";
import * as React from "react";
import { Copyright } from "./Copyrigth";

function Footer() {
  return (
    <Box
      as="footer"
      role="contentinfo"
      mx="auto"
      maxW="7xl"
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
          <Image src="logo.png" w="200px" />
        </Stack>
        <Copyright alignSelf="start" />
      </Stack>
    </Box>
  );
}

export default Footer;
