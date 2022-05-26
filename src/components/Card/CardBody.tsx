import { View } from "@react-spectrum/view";

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
