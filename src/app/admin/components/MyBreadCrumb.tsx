'use client';

import Link from "next/link";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

interface MyBreadCrumbProps {
    url: {
        name: string;
        url: string;
    }[];
    id?: string;
}

const MyBreadCrumb = ({ url, id }: MyBreadCrumbProps) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {url.map((item, index) => (
                    <React.Fragment key={item.url + item.name}>
                        <BreadcrumbItem>
                                <Link href={id ? `${item.url}/${id}` : item.url} className="capitalize hover:text-slate-800 transition duration-300">
                                    {item.name}
                                </Link>
                        </BreadcrumbItem>
                        {index < url.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default MyBreadCrumb;
