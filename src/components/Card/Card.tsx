import { useSpring } from "@react-spring/web";
import { useState } from "react";
import { StatusCard } from "screens/Dashboard/screens/Stats/components";
import CardBody from "./CardBody";
import CardHeader from "./CardHeader";

export const Card = ({
  headerProps,
  bodyProps,
  openView,
  overflow = true,
  animation,
}: any) => {
  const [open, setOpen] = useState(false);
  const [styleSpringBox, springBox] = useSpring(() => ({
    to: {
      height: 500,
    },
    from: {
      height: 0,
    },
    reverse: true,
    immediate: false,
    config: {
      bounce: 500,
      mass: 3,
      tension: 150,
      clamp: true,
    },
    // onRest: (a) => a.finished && setOpen(!open),
  }));

  console.log(styleSpringBox);
  return (
    <CardHeader
      style={styleSpringBox}
      open={open}
      overflow={overflow}
      onOpen={() => {
        const a = springBox.start({
          reverse: true,
          onStart: () => setOpen(true),
          onRest: (a) => {
            if (open) {
              setOpen(false);
            }
          },
        });
      }}
      {...headerProps}
    >
      <CardBody {...bodyProps} />
    </CardHeader>
  );
};
