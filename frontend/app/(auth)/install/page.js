'use client'

import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/Input'
import InputError from '../../../components/InputError/InputError'
import Label from '../../..//components/Label/Label'
import {useAuth} from '../../../hooks/auth'
import { useState} from 'react'


export default function Page() {
    const {register} = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/photos',
    })

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])

    const submitForm = event => {
        event.preventDefault()

        register({
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
        })
    }

    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Installation</h2>
            <div className="w-3/4 sm:max-w-md flex flex-col justify-center items-center space-y-4">
                <p className="border-4 border-gray-500 rounded-lg p-4 font-semibold text-md">
                    Since you are the first user on the system, you will be assigned
                    as the Admin and are responsible for administrative tasks, and
                    additional users will be created by you.
                </p>
            </div>
            <form onSubmit={submitForm} className="mt-8 w-3/4 space-y-4">

                {/* Name */}
                <div>
                    <Label htmlFor="name" className="">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        value={name}
                        className="block mt-1 w-full"
                        onChange={event => setName(event.target.value)}
                        required
                        autoFocus
                    />
                    <InputError messages={errors.name} className="mt-2"/>
                </div>

                {/* Admin Email Address */}
                <div>
                    <Label htmlFor="email" className="">Admin Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        className="block mt-1 w-full"
                        onChange={event => setEmail(event.target.value)}
                        required
                        autoFocus
                    />
                    <InputError messages={errors.email} className="mt-2"/>
                </div>

                {/* Admin Password */}
                <div className="mt-4">
                    <Label htmlFor="password">Admin Password</Label>

                    <Input
                        id="password"
                        type="password"
                        value={password}
                        className="block mt-1 w-full"
                        onChange={event => setPassword(event.target.value)}
                        required
                        autoComplete="current-password"
                    />

                    <InputError
                        messages={errors.password}
                        className="mt-2"
                    />
                </div>

                {/* Admin Confirm Password */}
                <div className="mt-4">
                    <Label htmlFor="passwordConfirmation">Admin Password</Label>

                    <Input
                        id="passwordConfirmation"
                        type="password"
                        value={passwordConfirmation}
                        className="block mt-1 w-full"
                        onChange={event => setPasswordConfirmation(event.target.value)}
                        required
                        autoComplete="current-password"
                    />

                    <InputError
                        messages={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>


                <div className="flex items-center justify-center mt-4">


                    <Button className="ml-4">Sign Up</Button>
                </div>
            </form>
        </>
    )
}
