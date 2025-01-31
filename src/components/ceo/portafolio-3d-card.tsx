"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Link from "next/link";
import { GithubIcon } from "lucide-react";
import { PortafolioLinksProps } from "./porta-links";
type ThreeDCardOptions= {
  title: string
  desc: string
  img: string
  imgDesc: string
  buttons: {
    ver: string
    code: string
  }
}
type ThreeDCardBaseProps = {
  options: ThreeDCardOptions
  links: PortafolioLinksProps["data"]
}


export function ThreeDCardPortafolio({options, links}: ThreeDCardBaseProps) {
  const {title, desc, img ,imgDesc, buttons}= options
  return (
    <CardContainer className="inter-var">
      <CardBody className=" relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black   w-auto sm:w-[40rem] md:w-[55rem] h-auto rounded-xl p-6   bg-transparent/15 ">
        <CardItem
          translateZ="50"
          className="text-xl pl-8 font-bold  text-white"
        >
          {/* Make things float in air */}
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className=" pl-8 text-sm mt-2  text-neutral-300"
        >
          {/* Hover over this card to unleash the power of CSS perspective */}
          {desc}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={img}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt={imgDesc}
          />
        </CardItem>
        <div className={links.web===undefined?"flex justify-end items-center mt-10":"flex justify-between items-center mt-10"}>
          {links.web === undefined?null:<CardItem
            translateZ={20}
            as={Link}
            href={links.web}
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            {buttons.ver} →
          </CardItem>}
          <CardItem
            translateZ={20}
            as={Link}
            target="__blank"
            href={links.github}
            
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold flex gap-2"
          >
            <span>{buttons.code} </span><GithubIcon width={12} height={12}/>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
