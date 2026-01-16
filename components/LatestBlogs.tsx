import React from "react";
import { Title } from "./ui/Title";
import { getLatestBlogs } from "@/sanity/queries";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import dayjs from "dayjs";
import Container from "./Container";

const LatestBlogs = async () => {
  const latestBlogs = await getLatestBlogs();
  return (
    <Container className="mb-10 lg:mb-20">
      <Title className="font-semibold text-2xl text-darkColor mb-5">
        Latest Blog
      </Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {latestBlogs?.map((blog) => (
          <div
            key={blog?._id}
            className="rounded-lg overflow-hidden border cursor-pointer hover:border-shop_dark_green hoverEffect"
          >
            {blog?.mainImage && (
              <Link key={blog?._id} href={blog?._id}>
                <Image
                  alt="Blog Image"
                  height={300}
                  width={300}
                  src={urlFor(blog?.mainImage).url()}
                  className="w-full max-h-40 object-cover"
                />
              </Link>
            )}
            <div className="flex flex-col gap-5 p-5 ">
              <div className="flex items-center justify-between">
                {blog?.blogcategories?.map((item, index) => (
                  <p
                    key={index}
                    className="font-semibold text-shop_dark_green tracking-wider text-xs pb-1 border-b-2 border-b-darkColor/20 inline-flex"
                  >
                    {item?.title}
                  </p>
                ))}
                <p className="text-darkColor/60 tracking-wider text-xs pb-1 border-b-2 border-b-darkColor/20 inline-flex">
                  {dayjs(blog?._createdAt)?.format("MMM D, YYYY")}
                </p>
              </div>
              <h5 className="font-semibold capitalize line-clamp-3">
                {blog?.title}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default LatestBlogs;
