import {
  Button,
  Checkbox,
  Content,
  Flex,
  Form,
  TextField,
} from "@adobe/react-spectrum";
import { useAuth } from "context/auth";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { session, saveSession } = useAuth();
  const location: any = useLocation();
  console.log("Testing deploy marplacode");
  const onSubmit = (session: any) => {
    saveSession(session);
  };

  if (session) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      alignContent="center"
      height="100%"
    >
      <Form maxWidth="size-3600" onSubmit={() => onSubmit("sad")}>
        <TextField label="Email" placeholder="abc@adobe.com" />
        <TextField label="Password" placeholder="1234" />
        <Checkbox>Remember me</Checkbox>
        <Button type="submit" variant="primary">
          Login
        </Button>
      </Form>
    </Flex>
  );
};

export default Login;
