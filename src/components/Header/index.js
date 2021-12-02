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
  useColorModeValue,
  useColorMode
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon,SunIcon,MoonIcon,BellIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { removeToken } from "../../graphql/config/auth";
import { useHistory } from "react-router-dom";
import IsAuth from "../../hooks/isAuth";

export default function Header() {
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const color = useColorModeValue("white")
  const {me}=IsAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  let dataUser=me?.meExtended
  const Links = {
    links:[
      {name:"Inicio",url:"/"},
      {name:"Tu calendario",url:"/mycalendar"},
      {name:"Tus equipos",url:"/"}
    ]
  }

  const logout = () => {
    removeToken();
    history.push("/login");
  };

  const goProfile = () => {history.push("/profile");};
  const goCreateAd = () => {history.push("/createad");};
  const goYourAds = () => {history.push("/yourads");};


  return (
    <>
      <Box bg="primary.100" px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
          variant="none"
            bg="transparent"
            size={"md"}
            icon={isOpen ? <CloseIcon color="white" /> : <HamburgerIcon color="white" />}
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
              {Links.links.map(link=>(
                <Link to={link.url}>{link.name}</Link>
              ))}
              <Button bg="primary.200" variant="none" onClick={goCreateAd}>Crear anuncio</Button>
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
            <Button mr={{base:"2",lg:"10"}} onClick={toggleColorMode} variant="none">
                {colorMode === "light" ? <MoonIcon color="white"/> : <SunIcon  color="white"/>}
              </Button>
            <Button color="white" variant="none" mr={{lg:"8"}} ><BellIcon/></Button>

              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar name={dataUser?.username} src={dataUser?.image?.name} size={"sm"} />
              </MenuButton>
              <MenuList zIndex="3" bg="primary.100" color="white">
                <MenuItem _hover={{bg:"primary.100"}} onClick={goProfile}>Tu perfil</MenuItem>
                <MenuItem _hover={{bg:"primary.100"}} >Tus equipos</MenuItem>
                <MenuItem _hover={{bg:"primary.100"}} onClick={goYourAds} >Tus anuncios</MenuItem>
                <MenuDivider />
                <MenuItem  _hover={{bg:"primary.100"}} onClick={logout}>Cerrar sesión</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack color="white" as={"nav"} spacing={4}>
            {Links.links.map(link=>(
                <Link to={link.url}>{link.name}</Link>
              ))}
              <Button bg="primary.200" variant="none" onClick={goCreateAd}>Crear anuncio</Button>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
