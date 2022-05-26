import { animated } from "@react-spring/web";
import { forwardRef } from "react";

const AnimatedView = forwardRef<any, any>((props: any, ref: any) => {
  const { children, style, ...newProps } = props;

  return (
    <animated.div ref={ref} style={style} {...newProps}>
      {children}
    </animated.div>
  );
});

export default AnimatedView;
