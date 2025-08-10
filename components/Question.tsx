'use client '
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const Question = () => {
    return (
        <Accordion type="multiple" className='flex gap-2 flex-col' >
            <AccordionItem value="item-1" className='bg-red-600 p-4 rounded-lg '>
                <AccordionTrigger className='text-3xl '>Why Movie Mirror ?</AccordionTrigger>
                <AccordionContent className=' text-2xl'>
                    It is a web app which analysis your movie genra nd suggest you movie basis and you als find best movie.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className='bg-red-600 p-4 rounded-lg '>
                <AccordionTrigger className='text-3xl '>How Much Does Movie Mirror Cost ?</AccordionTrigger>
                <AccordionContent className='text-2xl'>
                    It's Absolutely free 
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className='bg-red-600 p-4 rounded-lg '>
                <AccordionTrigger className='text-3xl '>Where Can I Watch?</AccordionTrigger>
                <AccordionContent className='text-2xl'>
                    Watch anywhere, anytime. Sign in with your MovieMirror account to watch instantly on the web at MovieMirror.com from your personal computer or on any internet-connected device that offers the web  app, including smart TVs, smartphones, tablets, streaming media players and game consoles.
                    You can also download your favourite shows with the iOS or Android app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className='bg-red-600 p-4 rounded-lg '>
                <AccordionTrigger className='text-3xl '>What Can I Watch on Movie Mirror?</AccordionTrigger>
                <AccordionContent className='text-2xl'>
                    You watch your Movie favourite genera on the time any where
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className='bg-red-600 p-4 rounded-lg '>
                <AccordionTrigger className='text-3xl '>Is Movie Mirror good for everyone?</AccordionTrigger>
                <AccordionContent className='text-2xl'>
                    Yaaa... it's very much user friendly you use it
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default Question