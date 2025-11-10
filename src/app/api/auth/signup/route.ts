import { prisma } from "@/lib/prisma";
import { NextRequest,NextResponse } from "next/server";

import { hashPassword,generateToken } from "@/lib/auth";

export async function POST (request:NextRequest){
    try{

        const body = await request.json()

        const {firstName,lastName,email,password} = body

        if(!firstName||!lastName||!email||!password){
            return NextResponse.json(
                {error:"All fields are required"},
                {status:400}

            )
        }

        if(password.length < 6){
            return  NextResponse.json(
                {error:"Password must be 6 characters long"},{status:400}
            )
        }

        const existingUser = await prisma.user.findUnique({
            where:{
                email:email.toLowerCase()
            }
        })

        if(existingUser){
            return NextResponse.json(
                {error:"User with this email already exists"},
                {status:409}
            )
        }

        const hashedPassword = await hashPassword(password)

        const user = await prisma.user.create({
            data:{
                name:`${firstName} ${lastName}`,
                email:email.toLowerCase(),
                password:hashedPassword,
            }
        ,
        select:{
            id:true,
            name:true,
            email:true,
            isVerified:true,
            createdAt:true
        }})

        const token = generateToken(user.id)

        const response = NextResponse.json({
            success:true,
            message:"Account created successfully",
            user,
            token
        },
        {status:201})

        response.cookies.set(
            "auth-token",token,{
                httpOnly:true,
                secure:process.env.NODE_ENV==="production",
                sameSite:"lax",
                maxAge:60*60*24*7
            }
        )

        return response







    }
    catch(err){

        console.log("Singup error",err)
        return NextResponse.json({error:"Internal server error"},{status:500})



    }
}