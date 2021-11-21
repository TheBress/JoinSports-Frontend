import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
  Image,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon,SunIcon,MoonIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { removeToken } from "../../graphql/config/auth";
import { useHistory } from "react-router-dom";
import IsAuth from "../../hooks/isAuth";

export default function Header() {
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Links = ["Inicio", "Projects", "Team"];
  const { colorMode, toggleColorMode } = useColorMode();
  const color = useColorModeValue("white")
  const {me}=IsAuth();
  let dataUser=me?.meExtended

  const logout = () => {
    removeToken();
    history.push("/login");
  };

  const goProfile = () => {
    history.push("/profile");
  };
  return (
    <>
      <Box bg="primary.100" px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            bg="transparent"
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"} color={color}>
            <Box>
              <Link to="/">
                <Image src="./logo.png" alt="a" h="70" p="3" />
              </Link>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <Link color="red" key={link} to={`/${link}`}>
                  {link}
                </Link>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
            <Button mr={{base:"2",lg:"10"}} onClick={toggleColorMode} variant="none">
                {colorMode === "light" ? <MoonIcon color="white"/> : <SunIcon  color="white"/>}
              </Button>

              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} src={dataUser?.image?.name} />
              </MenuButton>
              <MenuList  bg="primary.100" color="white">
                <MenuItem _hover={{bg:"primary.100"}} onClick={goProfile}>Tu perfil</MenuItem>
                <MenuDivider />
                <MenuItem  _hover={{bg:"primary.100"}} onClick={logout}>Cerrar sesión</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <Link key={link} to={`/${link}`}>
                  {link}
                </Link>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
