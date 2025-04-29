import { UsersProvider } from '@/providers/UsersContext'
import React from 'react'

export default function UsersLayout({children}) {
    return (
        <UsersProvider>
            <div className="p-4">{children}</div>
        </UsersProvider>
    );
}
