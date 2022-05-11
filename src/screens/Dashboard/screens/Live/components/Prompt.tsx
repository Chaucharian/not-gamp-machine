import { Heading, Button } from "@adobe/react-spectrum";
import { Flex } from "@react-spectrum/layout";
import { View } from "@react-spectrum/view";
import { SPACING } from "app/theme";

const Prompt = ({ option1, option2, title, onPress }: any) => {
  return (
    <View
      backgroundColor={"gray-200"}
      borderRadius="medium"
      height="size-1500"
      zIndex={10}
      padding={SPACING.thiny}
    >
      <Flex
        height="100%"
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={SPACING.thiny}
      >
        <Heading level={4}>{title}</Heading>
        <Flex gap={SPACING.thiny}>
          <Button
            variant="primary"
            onPress={() => {
              onPress(option1);
            }}
          >
            {option1}
          </Button>
          <Button
            variant="primary"
            onPress={() => {
              onPress(option2);
            }}
          >
            {option2}
          </Button>
        </Flex>
      </Flex>
    </View>
  );
};

export default Prompt;
