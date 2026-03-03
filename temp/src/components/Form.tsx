import { useState } from "react";
import { Field, FieldGroup, FieldLabel } from "./ui/field.tsx";
import { Card, CardHeader, CardTitle } from "./ui/card.tsx";
import { Input } from "./Input.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select.tsx";
import { Button } from "./Button.tsx";


export function Form() {
  const [name, setName] = useState('Name')
  const [email, setEmail] = useState('Email')
  const [selectedFruit, setSelectedFruit] = useState('')

  return (
      <Card>
        <CardHeader>
          <CardTitle>Form</CardTitle>
        </CardHeader>
        <div className="w-full max-w-md">
          <form onSubmit={(e) => {
            e.preventDefault()
            window.alert(`${name} placed an order for ${selectedFruit}`)
          }}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full name</FieldLabel>
                <Input 
                id='name' 
                autoComplete="off" 
                placeholder="Evil Rabbit" 
                onChange={(e) => setName(e.target.value)}/>
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Select onValueChange={(e) => {setSelectedFruit(e)}}>
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder='Select a fruit' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value='apple'>Apple</SelectItem>
                    <SelectItem value='banana'>Banana</SelectItem>
                    <SelectItem value='blueberry'>BlueBerry</SelectItem>
                    <SelectItem value='grapes'>Grapes</SelectItem>
                    <SelectItem value='pineapple'>Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FieldGroup>
            <Button type='submit' />
          </form>
        </div>
      </Card>
  )
}