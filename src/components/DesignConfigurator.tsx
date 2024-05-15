'use client'

import NextImage from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import { cn, formatPrice } from "@/lib/utils";
import {Rnd} from 'react-rnd'
import HandleResizeComponent from "./HandleResizeComponent";
import { ScrollArea } from "./ui/scroll-area";
import { useRef, useState } from "react";
import { COLORS, FINISHES, MATERIALS, MODELS } from "@/validators/options-validator";
import {RadioGroup, Radio, Label as RadioLabel, Description} from '@headlessui/react'
import { Label } from "./ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ArrowRight, Check, ChevronsUpDown } from "lucide-react";
import { BASE_PRICE } from "@/constants";

interface DesignConfiguratorProps {
    configId: string,
    imageUrl: string,
    width: number,
    height: number
}

const DesignConfigurator = ({configId, imageUrl, width, height}: DesignConfiguratorProps) => {

    const [options, setOptions] = useState<
        {   color: (typeof COLORS)[number], 
            model: (typeof MODELS.options)[number],
            material: (typeof MATERIALS.options)[number],
            finish: (typeof FINISHES.options)[number]
        }>({
        color: COLORS[0],
        model: MODELS.options[0],
        material: MATERIALS.options[0],
        finish: FINISHES.options[0]
    })


    return (
        <div className="relative mt-20 grid grid-cols-3 mb-20 pb-20">
            <div className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex justify-center items-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
                    <AspectRatio ratio={896/1831} className="pointer-events-none aspect-[896/1831] relative z-50 w-full">
                        <NextImage alt="phone image" src="/phone-template.png" fill className="pointer-events-none z-50 select-none" />
                    </AspectRatio>
                    <div className="absolute z-40 left-[3px] right-[3px] top-px bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]"></div>
                    <div className={cn("absolute left-[3px] right-[3px] top-px bottom-px rounded-[32px]", `bg-${options.color.tw}`)}></div>
                </div>
                <Rnd default={{
                    x: 0,
                    y: 50,
                    width: width / 10,
                    height: height / 10
                }}
                className="absoulte z-20 border-[2px] border-primary"
                lockAspectRatio
                resizeHandleComponent={{
                    topLeft: <HandleResizeComponent/>,
                    topRight:  <HandleResizeComponent/>,
                    bottomLeft:  <HandleResizeComponent/>,
                    bottomRight:  <HandleResizeComponent/>,
                }}>
                    <div className="relative w-full h-full">
                        <NextImage fill src={imageUrl} alt="your image" className="pointer-events-none" />
                    </div>
                </Rnd>
            </div>
            <div className="h-[37.5rem] flex flex-col bg-white">
                <ScrollArea className="relative flex-1 overflow-auto">
                    <div aria-hidden="true" className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none">
                    </div>
                    <div className="px-9 pb-12 pt-8">
                        <h2 className="tracking-tight font-bold text-3xl">
                            Customise your case
                        </h2>
                        <div className="w-full h-px bg-zinc-200 mt-4"></div>
                        <div className="relative mt-4 h-full flex flex-col justify-between">
                            <div className="flex flex-col gap-6">
                                <RadioGroup value={options.color} onChange={(val) => {
                                    setOptions((prev) => ({...prev, color: val}))
                                }}>
                                    <Label>Color: {options.color.label}</Label>
                                    <div className="mt-3 flex items-center space-x-3">
                                        {COLORS.map((color) => (
                                            <Radio key={color.label} value={color} className={({checked}) => cn('relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent', {
                                                [`border-${color.label}`]: checked
                                            })}>
                                                <span className={cn(`bg-${color.tw}`, 'h-8 w-8 rounded-full border border-black border-opacity-20')}></span>
                                            </Radio>
                                        ))}
                                    </div>
                                </RadioGroup>
                                <div className="relative flex flex-col gap-3 w-full">
                                    <Label>Model </Label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild >
                                            <Button variant={'outline'} role="combobox" className="w-full justify-between">
                                                {options.model.label}
                                                <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 ml-2"/>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="min-w-[200px] xl:min-w-[300px]">
                                            {MODELS.options.map((model) => (
                                                <DropdownMenuItem key={model.label} className={cn('flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100', {
                                                    'bg-zinc-100': model.value === options.model.value
                                                })} onClick={() => setOptions((prev) => ({...prev, model}))}>
                                                    <Check className={cn("h-4 w-3 mr-2 text-primary", model.value === options.model.value ? 'opacity-100' : 'opacity-0')} />
                                                    {model.label}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                {[MATERIALS, FINISHES].map(({name, options: selectableOptions}) => (
                                    <RadioGroup key={name} value={options[name]} onChange={(val) => {
                                        setOptions((prev) => ({
                                            ...prev,
                                            [name]: val
                                        }))
                                    }}>
                                        <Label>{name.slice(0, 1).toUpperCase() + name.slice(1)}</Label>
                                        <div className="mt-3 space-y-4">
                                            {selectableOptions.map((option) => (
                                                <Radio key={option.label} value={option} className={({checked}) => cn('relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between', {
                                                    'border-primary': checked
                                                })}>
                                                    <span className="flex items-center">
                                                        <span className="flex flex-col text-sm">
                                                            <RadioLabel as={'span'} className='font-medium text-gray-900'>
                                                                {option.label}
                                                            </RadioLabel>
                                                            {option.description ? 
                                                            (<Description as="span" className={'text-gray-500'}>
                                                                <span className="block sm:inline">{option.description}</span>
                                                            </Description>) : null}
                                                        </span>
                                                    </span>
                                                    <Description as="span" className="mt-2 flex text-sm sm:ml-2 sm:mt-0 sm:flex-col sm:text-right">
                                                        <span className="font-medium text-gray-900">
                                                            {formatPrice(option.price/100)}
                                                        </span>
                                                    </Description>
                                                </Radio>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollArea>
                <div className="w-full px-8 h-16 bg-white">
                    <div className="h-px w-full bg-zinc-200"></div>
                    <div className="h-full w-full flex justify-end items-center">
                        <div className="flex items-center w-full gap-6">
                            <p className="font-medium whitespace-nowrap">{formatPrice((BASE_PRICE + options.material.price + options.finish.price) / 100)}</p>
                            <Button size={"sm"} className="w-full">
                                Continue
                                <ArrowRight className="w-4 h-4 ml-1.5 inline"/>
                            </Button>
                        </div>
                    </div>                                   
                </div>
            </div>
        </div>

    )
}

export default DesignConfigurator;