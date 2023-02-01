import { Button } from "@chakra-ui/react";
import React from "react";
import { signIn, useSession, signOut } from "next-auth/react";
const index = () => {
  const { data, status } = useSession();

  return (
    <>
      {status === "authenticated" ? (
        <Button
          colorScheme="messenger"
          variant="solid"
          onClick={() => {
            signOut({
              callbackUrl: "http://localhost:3000",
            });
          }}
        >
          Logout
        </Button>
      ) : (
        <Button
          colorScheme="messenger"
          variant="solid"
          onClick={() => {
            signIn("google", {
              callbackUrl: "http://localhost:3000",
            });
          }}
        >
          SignIn
        </Button>
      )}
    </>
  );
};

export default index;
