import { Flex, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

type Props = {
  Icon: IconType;
  label: string;
};

function HeaderMenuItem({ Icon, label }: Props) {
  return (
    <Flex gap="1" color="gray.700" cursor="pointer" _hover={{ color: "green" }}>
      <Icon size="25" />
      <Text fontSize="larger">{label}</Text>
    </Flex>
  );
}

export default HeaderMenuItem;
