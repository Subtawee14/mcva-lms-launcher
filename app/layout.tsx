import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'MyCourseVille Assessment Platform Launcher',
    description: 'Launch and manage MyCourseVille assessment platform users'
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
