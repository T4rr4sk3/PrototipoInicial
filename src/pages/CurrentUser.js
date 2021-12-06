import React from 'react'

const user = { username: String, isLogged: Boolean }

user.username = 'Linspector'
user.isLogged = true

export function useUser(){
    return user;
}