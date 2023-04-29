import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";
import LogoDark from "../../../assets/images/logos/logo-dark.svg";
import Logo from '../../../../public/logo.jpg'

const LogoIcon = () => {
  return (
    <Link href="/">
      <Image src={Logo} alt={LogoDark} width={200}/>
    </Link>
  );
};

export default LogoIcon;
