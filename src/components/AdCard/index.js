import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image
} from '@chakra-ui/react';

export default function AdCard(props) {

    const sanitizeDate=(date)=>{
        const positionT=date.indexOf("T");
        const newDate=date.substring(0,positionT)+" "+date.substring(positionT+1)
        return newDate;
    }

    const newDate=sanitizeDate(props.date);

    console.log(newDate);
  return (
    <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Box
          h={'210px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}>
          <Image
                src=""
          />
        </Box>
        <Stack>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
            {props.name}
          </Heading>
          <Text color={'gray.500'}>
            {props.description}
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Avatar
            name={props.user}
            src={props.userImage}
            alt={'Author'}
          />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>{props.user}</Text>
            <Text fontWeight={600}>{props.sport}</Text>

            <Text >{props.fullLocation}</Text>
            <Text color={'gray.500'}>{newDate}</Text>

          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}