import * as React from "react"
import { useState,useEffect } from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface MySelectProps {
    name: "kategoriId" ;
    setValue: (name:  "kategoriId", value: any) => void
    categories : {id: string; nama: string}[];
    value? :string
}

export function MySelect({ name, setValue, categories,value }: MySelectProps) {
    const [selectedValue, setSelectedValue] = useState(value);
    
    const handleChange = (value: string) => {
        setSelectedValue(value)
        setValue(name, value)
    }

    return (
        <Select value={selectedValue} onValueChange={handleChange} name={name}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Select Category</SelectLabel>
                    {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.nama}>{category?.nama}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
