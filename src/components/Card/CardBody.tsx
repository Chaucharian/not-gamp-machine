import { Heading } from "@adobe/react-spectrum";
import { Flex } from "@react-spectrum/layout";
import { View } from "@react-spectrum/view";
import { SPACING } from "app/theme";
import { Text } from "components";

export const CardBody = ({
  heading = "",
  status = "",
  icon = () => {},
}: any) => {
  return (
    <View
      height="100%"
      borderColor="gray-200"
      borderStartWidth="thin"
      borderEndWidth="thin"
      borderBottomWidth="thin"
      borderRadius="small"
      backgroundColor="gray-50"
    ></View>
  );
};

export default CardBody;
