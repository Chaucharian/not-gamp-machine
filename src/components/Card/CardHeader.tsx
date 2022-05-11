import { Heading } from "@adobe/react-spectrum";
import { Flex } from "@react-spectrum/layout";
import { View } from "@react-spectrum/view";
import { SPACING } from "app/theme";
import { Text } from "components";
import AnimatedView from "../AnimatedView";

const overflowStyles = {
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  child: { zIndex: 10, width: "100%", position: "absolute" },
};

export const CardHeader = ({
  heading = "",
  status = "",
  icon = () => {},
  style,
  open,
  overflow = true,
  children,
  onOpen,
}: any) => {
  return (
    <Flex direction="column">
      <View borderColor="gray-200" borderWidth="thin" borderRadius="small">
        <div onClick={onOpen}>
          <Flex height="size-600">
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
        </div>
      </View>
      <div
        style={{
          ...(overflow && { ...overflowStyles.container }),
        }}
      >
        <AnimatedView
          style={{
            ...style,
            ...(overflow && { ...overflowStyles.child }),
          }}
        >
          {open && children}
        </AnimatedView>
      </div>
    </Flex>
  );
};

export default CardHeader;
