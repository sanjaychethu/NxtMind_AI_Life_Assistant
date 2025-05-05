import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    if (req.method !== 'POST') {
      return NextResponse.json(
        { message: 'Method not allowed' },
        { status: 405 }
      )
    }

    const { name, email, password } = await req.json()

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters long' },
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
    }

    // Hash password
    const hashedPassword = await hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        // Initialize empty profiles
        healthProfile: { create: {} },
        fitnessProfile: { create: {} },
        nutritionProfile: { create: {} },
        financeProfile: { create: {} },
        learningProfile: { create: {} },
        travelProfile: { create: {} },
        entertainmentProfile: { create: {} }
      },
    })

    return NextResponse.json(
      { 
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        message: 'Registration successful'
      },
      { 
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  } catch (error: any) {
    console.error('Registration error:', error)
    
    // Check for Prisma-specific errors
    if (error.code === 'P2002') {
      return NextResponse.json(
        { message: 'This email is already registered' },
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
    }

    return NextResponse.json(
      { message: 'Something went wrong with registration. Please try again.' },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  }
} 