import { Text } from "@adobe/react-spectrum";
import styled from "styled-components";

const CustomText = styled(({ fontSize, ...props }) => <Text {...props} />)`
  ${(props: any) => `
      font-size: ${props?.fontSize ? props?.fontSize : "15px"}
  `}
`;

export default CustomText;
