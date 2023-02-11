import React from "react";
import Logo from "@/public/assets/blogLogo.png";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Search2Icon, HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useSessionCustom } from "@/lib/next-auth-react-query";
// import AnonymousUser from "@/assets/images/user-line.svg";
import { RiNotification3Line } from "react-icons/ri";
import Image from "next/image";
import { signOut } from "next-auth/react";
const MenuItemsList = [
  {
    title: "Create Post",
    href: "/createpost",
  },
];
const UserMenuButton = ({ user }: { user: any }) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        className="rounded-full h-[40px] w-[40px] border-[1px] border-[#e8e8e8] p-0 "
      >
        <Image
          src={user.image ? user.image : ""}
          alt="user"
          width={40}
          height={40}
          className="overflow-hidden rounded-full"
        />
      </MenuButton>
      <MenuList className="mt-1 border-[1px] border-[#e9e9e9] rounded-md shadow-md w-[250px]">
        <MenuItem>
          <Box className="flex flex-col w-full">
            <span className="font-semibold">{user.name}</span>
            <span>@{user.name}</span>
          </Box>
        </MenuItem>
        <MenuDivider />
        <MenuGroup>
          {MenuItemsList.map((item) => (
            <MenuItem key={item.title}>
              <Link href={item.href} className="w-full">
                {item.title}
              </Link>
            </MenuItem>
          ))}
        </MenuGroup>
        <MenuDivider />
        <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  );
};
const Navbar = () => {
  const { session } = useSessionCustom();
  const router = useRouter();
  return (
    <div className="p-3  pl-20 pr-20 sm:pl-10 sm:pr-10 z-50 bg-[rgb(255,255,255)] shadow-[0_1px_1px_rgba(0,0,0,0.1)] flex justify-between">
      <Flex gap="2">
        <Box className="sm:block md:hidden">
          <IconButton
            variant="ghost"
            icon={<HamburgerIcon fontSize="1.25rem" />}
            aria-label="Open Menu"
          />
        </Box>
        <Link href="/">
          <img src={Logo.src} height="50px" width="50px" />
        </Link>
        <Box className="sm:hidden">
          <InputGroup width="400px">
            <Input type="text" placeholder="Search" />
            <InputRightElement pointerEvents="none">
              <Search2Icon color="gray.600" />
            </InputRightElement>
          </InputGroup>
        </Box>
      </Flex>
      <Wrap spacing={4}>
        {session && session.user ? (
          <>
            <Button
              variant={"outline"}
              className="min-w-[120px] hidden md:block border-[1px] border-primaryBlue text-primaryBlue hover:bg-primaryBlue hover:text-white"
              onClick={() => {
                router.push("/new");
              }}
            >
              Create Post
            </Button>
            <Button variant={"ghost"} p="4px" onClick={() => {}}>
              <RiNotification3Line size={24} />
            </Button>
            <UserMenuButton user={session.user} />
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="sm:hidden px-4 py-2 rounded-md hover:bg-[#EDF2F7]"
            >
              Login
            </Link>
            <Box className="sm:inline-block md:hidden">
              <Button colorScheme="teal" variant="ghost">
                <Search2Icon color="gray.600" />
              </Button>
            </Box>
            <WrapItem>
              <Link href="/login?state=newuser">
                <Button colorScheme="cyan">Create Account</Button>
              </Link>
            </WrapItem>
          </>
        )}
      </Wrap>
    </div>
  );
};

export default Navbar;
