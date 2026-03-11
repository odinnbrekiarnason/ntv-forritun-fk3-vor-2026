import { useState } from "react";
import { Input } from "./Input";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./Button";
import { Field, FieldGroup, FieldSet } from "./ui/field";

export function ShopCard() {
  const [myName, setMyName] = useState('')
  const [email, setEmail] = useState('')
  const onClick = () => {
    alert(`Submitted name: ${myName} and email: ${email}`)
  }
  return (
    <Card className="my-4">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="grow border h-0"></div>
          <CardTitle>Already filled out form?</CardTitle>
          <div className="grow border h-0"></div>
        </div>
      </CardHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          //onLoad()
        }}
        className="w-full"
      >
        <FieldSet>
          <FieldGroup>
            <Field>
              <Input
                className="bg-white"
                id="email"
                autoComplete="off"
                type="email"
                placeholder="asdf@ntv.is"
              />
            </Field>
          </FieldGroup>
        </FieldSet>
        <div className="flex flex-col py-4 gap-4">
          <Button value="load" type='submit' className="bg-green-500 p-4 rounded text-white uppercase" onClick={onClick}/>
          <Button value="create new" type="submit" className="bg-green-500 p-4 rounded text-white uppercase" />
        </div>
      </form>
    </Card>
  );
}