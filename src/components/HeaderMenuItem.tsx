import { Flex, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

type Props = {
  Icon: IconType;
  label: string;
};

function HeaderMenuItem({ Icon, label }: Props) {
  return (
    <Link to={`/${label.toLowerCase()}`}>
      <Flex gap="1" color="gray.700" cursor="pointer" _hover={{ color: 'green' }}>
        <Icon size="25" />
        <Text fontSize="larger">{label}</Text>
      </Flex>
    </Link>
  );
}

export default HeaderMenuItem;
