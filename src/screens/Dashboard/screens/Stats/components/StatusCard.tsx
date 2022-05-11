import { Heading } from "@adobe/react-spectrum";
import { Flex } from "@react-spectrum/layout";
import { View } from "@react-spectrum/view";
import { SPACING } from "app/theme";
import { Text } from "components";

export const StatusCard = ({ heading = "", status = "", icon }: any) => {
  return (
    <View
      height="size-800"
      borderColor="gray-200"
      borderWidth="thin"
      borderRadius="small"
      width={{ base: "100%", L: "size-3000" }}
    >
      <Flex height="100%">
        <View backgroundColor="gray-200" width="size-600">
          <Flex
            height="100%"
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            {icon()}
          </Flex>
        </View>
        <View
          minWidth="size-2000"
          backgroundColor="gray-100"
          paddingStart={SPACING.small}
          paddingEnd={SPACING.small}
          paddingBottom={SPACING.thiny}
          paddingTop={SPACING.thiny}
        >
          <Flex direction="column">
            <Heading height={SPACING.medium} marginY={0}>
              {heading}
            </Heading>
            <Text fontSize="30px">{status}</Text>
          </Flex>
        </View>
      </Flex>
    </View>
  );
};

export default StatusCard;
