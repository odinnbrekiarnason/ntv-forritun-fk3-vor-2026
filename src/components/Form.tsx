import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "./Input";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Field, FieldGroup, FieldSet } from "./ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./Button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import useDebounce from "@/hooks/useDebounce";

type FormValuesType = {
  firstName: string
  lastName: string
  email: string
  mobileNumber: string
  selectedFruit: string
  radioButton: string | null
}


export function Form() {
  // TODO: Remove ref data set, and only use state to keep track of realtime local data (written in input)
  // NOTE: You might want to detach the email from the data set (since it's used to index the localstorage)

  const [values, setValues] = useState<FormValuesType>({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    selectedFruit: '',
    radioButton: null,
  })

  const searchTerm = useDebounce(values.email, 1000);

  const onInputChange = useCallback((key: keyof FormValuesType, value: string) => {
    values[key] = value
  }, [])

  const onSubmit = () => {
    const data: FormValuesType = values
    localStorage.setItem(data.email, JSON.stringify(data))
    window.alert(`Hello ${data.firstName}; email address ${data.email};`)
  }

  const formFilled = useEffect(() => {
    console.log('Checking localStorage')
    if(localStorage.length >= 1 || localStorage.key(0)) {
      const data = values
      const getData = localStorage.getItem(data.email)

      if(getData) {
        const parsedData: FormValuesType = JSON.parse(getData)
        setValues(parsedData)
        window.alert('fields filled out from your saved email')
      }
    } 
  }, [])


  // TODO: Use the correct state to connect to debounce state
  // TODO: Write useEffect to repopulate the localstorage after debounce
  // NOTE: The email has to be present for this to work
  // TODO: If no email is provided, display only the email input, or some other alternative UX

  return (
    <div>
      {<Card className="w-3/4 max-w-7xl bg-blue-950">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="grow border h-0"></div>
            <CardTitle className="text-white">Example</CardTitle>
            <div className="grow border h-0"></div>
          </div>
        </CardHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit()
          }}
          className="w-full"
        >
          <FieldSet>
            <FieldGroup>
              <Field>
                <Input
                  className="bg-white"
                  id="firstName"
                  autoComplete="off"
                  placeholder="Gunnsteinn"
                  // TODO: Set values to all input fields in the form
                  onChange={(e) => {
                   onInputChange('firstName', e.target.value)
                   console.log(e.target.value)
                  }}
                />
              </Field>
              <Field>
                <Input
                  className="bg-white"
                  id="lastName"
                  autoComplete="off"
                  placeholder="Skulason"
                  onChange={(e) => {
                    onInputChange('lastName', e.target.value)
                  }}
                />
              </Field>
              <Field>
                <Input
                  className="bg-white"
                  id="email"
                  autoComplete="off"
                  type="email"
                  placeholder="asdf@ntv.is"
                  onChange={(e) => {
                    onInputChange('email', e.target.value)
                  }}
                />
              </Field>
              <Field>
                <Input
                  className="bg-white"
                  id="mobileNumber"
                  autoComplete="off"
                  type="number"
                  placeholder="Mobile number"
                  onChange={(e) => {
                    onInputChange('mobileNumber', e.target.value)
                  }}
                />
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Select
                onValueChange={(e) => {
                  onInputChange('mobileNumber', e)
                }}
              >
                <SelectTrigger className="w-full bg-white" >
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FieldGroup>
            <FieldGroup>
              <RadioGroup defaultValue="comfortable" className="w-fit flex" onValueChange={(e) => {
                onInputChange('mobileNumber', e)
              }}>
                <RadioGroupItem className="bg-white" value="yes" id="yes" onChange={(e) => e.target.value} />
                <Label className="text-white" htmlFor="yes">Yes</Label>
                <RadioGroupItem className="bg-white" value="no" id="no" onChange={(e) => e.target.value} />
                <Label className="text-white" htmlFor="no">No</Label>
              </RadioGroup>
            </FieldGroup>
          </FieldSet>
          <div className="flex flex-col py-4 gap-4">
            <Button type="submit" className="bg-pink-500 p-4 rounded text-white uppercase"/>
          </div>
        </form>
      </Card>}
    </div>
  );
}

