import { auth } from "@clerk/nextjs/server"

const adminIds = [
    "user_2gbUXojGR2KvN3bE4ghq93z9s74"
]

export const isAdmin =   ()=>{
    const {userId} =   auth()

    if (!userId) {
        return false
    }

    return adminIds.indexOf(userId) !== -1
}