import { NextResponse , NextRequest } from "next/server"; 

import { prisma } from "@/lib/prisma";

import { verifyPassword,generateToken } from "@/lib/auth";

export async function POST(request:NextRequest){
    try{
        const body = await request.json()
        const {email,password} = body 

        if(!email || !password){
            return NextResponse.json(
                {
                    error : "Email and password are required"

                },
                
                {
                    status:400

                }
            )
        }

        const user = await prisma.user.findUnique({
            where:{
                email:email.toLowerCase()
            }

        })

        if(!user){
            return NextResponse.json(
                {
                    error : "User not Found"
                }
                ,{
                    status:401

                }
            )
        }

        const isValidPassword = await verifyPassword(password, user.password ?? '')

        if(!isValidPassword){
            return NextResponse.json(
                {
                    error : "Invalid credentials"
                }
                ,{
                    status:401

                }
            )
        }

        const token = generateToken(user.id)

        const userData = {
            id: user.id,
            name:user.name,
            email: user.email,
            isVerified: user.isVerified,
            walletAddr: user.walletAddr,
            createdAt: user.createdAt

        }


        const response = NextResponse.json(
            {
            success:true,
            message:"login successful",
            user: userData,
            token
        },
        {
            status:200
        })

        response.cookies.set("auth-token",token,
            {
                    httpOnly:true,
                    secure:process.env.NODE_ENV==="production",
                    sameSite:"lax",
                    maxAge: 60*60*24*7
                }
            )


        return response
        

    
    }
    catch(err){

        console.error("login error",err)

        return NextResponse.json(
            {error:"Internal server error"},
            {status:500}
        )



    }
}