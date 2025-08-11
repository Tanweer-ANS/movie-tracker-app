'use client'
import React from 'react'
import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface CardProps {
    data: {
        title: string;
        description: string;
        icon_url: string;
    };
}

const CardFormat = ({ data }: CardProps) => {
    return (
        <Card className="flex flex-col h-auto bg-slate-900 border-none p-6">
            <CardHeader className="p-0">
                <CardTitle className="text-white text-xl font-bold">{data.title}</CardTitle>
                <CardDescription className="text-gray-400 mt-2">{data.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-0 mt-4">
                <div className="w-16 h-16 relative">
                   {/* add icon here  */}
                </div>
            </CardContent>
        </Card>
    )
}

export default CardFormat