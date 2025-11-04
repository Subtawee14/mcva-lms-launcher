import { NextRequest, NextResponse } from 'next/server'

const PASSWORD = process.env.PROD_PASSWORD || 'mapdev123456'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        if (body.password === PASSWORD) {
            return NextResponse.json({ name: 'Authorized' }, { status: 200 })
        } else {
            return NextResponse.json({ name: 'Unauthorized' }, { status: 401 })
        }
    } catch (error) {
        return NextResponse.json({ name: 'Bad Request' }, { status: 400 })
    }
}
