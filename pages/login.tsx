import { Button, Divider, Flex} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Navbar from "@/components/Navbar/Navbar";

const LoginMethods = (signup = false) => [
  {
    name: "google",
    icon: <FcGoogle size={20} />,
    title: `${signup ? "Sign up" : "Continue"} with Google`,
    textColor: "text-grey-800",
    bg: "bg-grey-200",
    hover: "hover:bg-grey-300 hover:text-grey-900",
  },
  {
    name: "github",
    icon: <AiFillGithub size={20} />,
    title: `${signup ? "Sign up" : "Continue"} with GitHub`,
    textColor: "text-white",
    bg: "bg-[#24292e]",
    hover: "hover:bg-black",
  },
];

function Login() {
  const { query } = useRouter();
  return (
    <div className="flex flex-col w-full relative h-screen bg-grey-50">
      <Navbar />
      <div className="flex m-auto w-full bg-grey-50">
        <div className="flex flex-col items-center w-full md:w-[640px] bg-white rounded-md p-5 mx-auto  border-[1px] border-grey-200">
          <h2 className="text-[20px] text-grey-900 font-bold md:text-[30px] text-center">
            Welcome to DEV Community 👩‍💻👨‍💻
          </h2>
          <span className="text-grey-700 text-md text-center">
            DEV Community 👩‍💻👨‍💻 is a community of 1,003,060 amazing developers
          </span>

          <div className="flex flex-col gap-2 w-full my-8">
            {LoginMethods(query?.state === "newuser").map((login) => (
              <Button
                key={login.name}
                className={`w-full ${login.textColor} ${login.bg} ${login.hover} text-base p-4 h-12`}
                leftIcon={login.icon}
                onClick={() => signIn(login.name, { callbackUrl: "/" })}
              >
                {login.title}
              </Button>
            ))}

            <Flex className="justify-center items-center mt-2">
              <Divider orientation="horizontal" />
              {query?.state === "newuser" ? (
                <div className="flex items-center justify-center text-sm min-w-max">
                  Already have account?
                  <Link
                    className="inline ml-2 hover:underline text-primaryBlue"
                    href={"/login"}
                  >
                    Login
                  </Link>
                </div>
              ) : (
                <div className="flex items-center justify-center text-sm min-w-max">
                  Do not have account?
                  <Link
                    className="inline ml-2  hover:underline text-primaryBlue"
                    href={"/login?state=newuser"}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
              <Divider orientation="horizontal" />
            </Flex>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
