"use server"

export const getServerUrl = async () => {
    return process.env.API_URL
}