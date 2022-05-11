import { createGlobalStyle } from "styled-components";
import { defaultTheme, Flex, Provider } from "@adobe/react-spectrum";
import { useState, createContext, useContext } from "react";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0px;
  }
`;

const Theme = createContext<any>({ changeTheme: () => {} });

const ThemeProvider = ({ children, ...props }: any) => {
  const [colorScheme, changeTheme] = useState("light");

  const onChange = () => {
    changeTheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <Theme.Provider value={{ changeTheme: onChange }}>
      <Provider theme={defaultTheme} colorScheme={colorScheme} {...props}>
        <GlobalStyle />
        <Flex height="100vh">{children}</Flex>
      </Provider>
    </Theme.Provider>
  );
};

export const useTheme = () => useContext(Theme);

export default ThemeProvider;
