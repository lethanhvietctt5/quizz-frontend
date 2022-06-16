import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import SlideQuizz from "../components/SlideQuizz";

function CreateGame() {
  return (
    <Box h="full">
      <Flex w="full" h="full">
        <Box w="15%" boxShadow="md" backgroundColor="white">
          <SlideQuizz />
        </Box>
        <Box flexGrow="1" backgroundColor="gray.200">
          <Flex
            h="full"
            direction="column"
            justify="space-between"
            align="center"
            py="4"
            px="8"
          >
            <Box w="full" boxShadow="md" mt="10">
              <input
                type="text"
                className="w-full py-3 rounded-md outline-none px-10 text-5xl text-center font-medium"
              />
            </Box>

            <Flex align="center">
              <Avatar
                bg="gray.400"
                size="2xl"
                icon={
                  <input
                    type="number"
                    className="w-full bg-inherit outline-none m-5 text-white text-center"
                  />
                }
              />
              <Text ml="3" color="gray" fontSize="3xl">
                seconds
              </Text>
            </Flex>

            <Box w="full">
              <Flex w="full" gap="4" mb="4">
                <Flex
                  flex="1"
                  px="4"
                  align="center"
                  rounded="md"
                  backgroundColor="red.600"
                >
                  <Text color="white" fontSize="3xl">
                    A.
                  </Text>
                  <input
                    type="text"
                    className="w-full py-10 px-5 text-white bg-inherit rounded-md outline-none text-2xl"
                  />
                </Flex>

                <Flex
                  flex="1"
                  px="4"
                  align="center"
                  rounded="md"
                  backgroundColor="blue.600"
                >
                  <Text color="white" fontSize="3xl">
                    B.
                  </Text>
                  <input
                    type="text"
                    className="w-full py-10 px-5 text-white bg-inherit rounded-md outline-none text-2xl"
                  />
                </Flex>
              </Flex>

              <Flex w="full" gap="4">
                <Flex
                  flex="1"
                  px="4"
                  align="center"
                  rounded="md"
                  backgroundColor="yellow.600"
                >
                  <Text color="white" fontSize="3xl">
                    C.
                  </Text>
                  <input
                    type="text"
                    className="w-full py-10 px-5 text-white bg-inherit rounded-md outline-none text-2xl"
                  />
                </Flex>

                <Flex
                  flex="1"
                  px="4"
                  align="center"
                  rounded="md"
                  backgroundColor="green.500"
                >
                  <Text color="white" fontSize="3xl">
                    D.
                  </Text>
                  <input
                    type="text"
                    className="w-full py-10 px-5 text-white bg-inherit rounded-md outline-none text-2xl"
                  />
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default CreateGame;
