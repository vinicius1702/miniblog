import { db } from "../firebase/config"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"
import { useEffect, useState } from "react"

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfItsCancelled() {
        if (cancelled) {
            return
        }
    }

    const createUser = async (data) => {
        checkIfItsCancelled()

        setLoading(true)
        setError(null)

        try {

            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false)

            return user

        } catch (error) {

            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha deve ter no mínimo 6 caracteres"
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail ja cadastrado"
            } else {
                systemErrorMessage = "Ocorreu um erro inesperado"
            }

            setLoading(false)
            setError(systemErrorMessage)

        }


    }

    const logout = () => {
        checkIfItsCancelled()

        signOut(auth)

    }

    const login = async (data) => {

        checkIfItsCancelled()

        setLoading(true)
        setError(false)

        try {

            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)

        } catch (error) {

            let systemErrorMessage

            if (error.message.includes("invalid-credential")) {

                systemErrorMessage = "Senha ou e-mail incorreto."

            } else {

                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."

            }

            setError(systemErrorMessage)
            setLoading(false)

        }

    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }
}