import { useCallback, useMemo, useRef, useState } from "react";
import { Input } from "./Input";
import { Card, CardHeader, CardTitle } from "./ui/card";
import {
    Field,
    FieldGroup,
    FieldSet,
} from "./ui/field";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Button } from "./Button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

type FormValuesType = {
    firstName: string
    lastName: string
    email: string
    mobileNumber: string
    selectedFruit: string
    radioButton: string | null
}

export function Form() {
    const dataRef = useRef<FormValuesType>({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        selectedFruit: '',
        radioButton: null,
    })

    const onInputChange = useCallback((key: keyof FormValuesType, value: string) => {
        dataRef.current[key] = value
    }, [])

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const headerValue = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName])


    const onSubmit = () => {
        const { firstName } = dataRef.current
        window.alert(`Hello ${firstName}`)
    }

    return (
        <div>
            <p>{headerValue} </p>
            <Input
                onChange={(e) => {
                }}
            />
            <Card className="w-3/4 max-w-7xl bg-blue-950">
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
                                    onChange={(e) => {
                                        onInputChange('firstName', e.target.value)
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
                                <RadioGroupItem className="bg-white" value="yes" id="yes" />
                                <Label className="text-white" htmlFor="yes">Yes</Label>
                                <RadioGroupItem className="bg-white" value="no" id="no" />
                                <Label className="text-white" htmlFor="no">No</Label>
                            </RadioGroup>
                        </FieldGroup>
                    </FieldSet>
                    <div className="flex flex-col py-4 gap-4">
                        <Button type="submit" className="bg-pink-500 p-4 rounded text-white uppercase" />
                        <div className="flex items-center gap-2">
                            <div className="grow border h-0"></div>
                            <CardTitle className="text-white">or</CardTitle>
                            <div className="grow border h-0"></div>
                        </div>
                        <Button value="edit" type="submit" className="bg-black p-4 rounded text-white uppercase border-pink-500 border" />
                    </div>
                </form>
            </Card>
        </div>);
}

export const calculatePasswordStrength = (password: string) => {
    // This console log is crucial! Have them watch their console.
    // If they don't useMemo, this will fire on every single keystroke in the form.
    console.log("Calculating password strength... (Heavy operation running!)");

    if (!password) return 0;

    // --- THE ARTIFICIAL LAG ---
    // This simulates a computationally expensive task. 
    // You may need to adjust the loop size depending on the speed of their machines, 
    // but 20 million iterations usually causes a noticeable stutter in the UI.
    let delay = 0;
    for (let i = 0; i < 20000000; i++) {
        // Intentionally set a value without using it to create artificial lag
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        delay += i;
    }

    // --- THE ACTUAL LOGIC ---
    let score = 0;

    if (password.length >= 8) score += 1; // Minimum length
    if (password.length >= 12) score += 1; // Good length
    if (/[A-Z]/.test(password)) score += 1; // Has uppercase
    if (/[0-9]/.test(password)) score += 1; // Has number
    if (/[^A-Za-z0-9]/.test(password)) score += 1; // Has special character

    console.log('Password checked!')

    // Returns a score from 0 to 5
    return score;
};

export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState();

    const setValue = (value: string) => {
        console.log('old value was', storedValue)
        console.log('new value is', value)
        setStoredValue(value);
    };

    return [storedValue, setValue];
}