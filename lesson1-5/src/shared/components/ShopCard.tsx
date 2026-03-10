import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "./Button";
import { Input } from "../ui/input";


export function ShopCard() {
    const [myName, setMyName] = useState('Hjalti')
    const [email, setEmail] = useState('')
    const onClick = () => {
        alert(`Submitted name: ${myName} and email: ${email}`)
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Shopping card</CardTitle>
            </CardHeader>
            <CardContent>
                <Input value={myName} onChange={(e) => setMyName(e.target.value)} />
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
                <Button onClick={onClick} value={'submit'} />
            </CardFooter>

        </Card>
    );
}