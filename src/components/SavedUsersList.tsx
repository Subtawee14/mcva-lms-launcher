'use client'

import { Card, Empty, Button, Tag, Popconfirm, App } from 'antd'
import { DeleteOutlined, EditOutlined, TeamOutlined } from '@ant-design/icons'
import type { UserData } from '../types'

interface SavedUsersListProps {
    users: UserData[]
    onSelectUser: (user: UserData) => void
    onDeleteUser: (id: string) => void
}

export default function SavedUsersList({ users, onSelectUser, onDeleteUser }: SavedUsersListProps) {
    const { message } = App.useApp()

    const handleDelete = (id: string) => {
        onDeleteUser(id)
        message.success('User removed from list')
    }

    const getRoleColor = (role: string) => {
        return role === 'STUDENT' ? 'blue' : 'purple'
    }

    const getEnvironmentColor = (env: string) => {
        const colors: Record<string, string> = {
            local: 'default',
            dev: 'cyan',
            staging: 'orange',
            preprod: 'gold',
            prod: 'red'
        }
        return colors[env] || 'default'
    }

    return (
        <div className="space-y-4">
            <Card className="glass-card">
                <div className="flex items-center gap-2 mb-4">
                    <TeamOutlined className="text-blue-600 text-xl" />
                    <h2 className="text-2xl font-bold text-gray-800">Saved Users</h2>
                    <span className="ml-auto bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                        {users.length}
                    </span>
                </div>

                {users.length === 0 ? (
                    <Empty
                        description={
                            <span className="text-gray-500">
                                No saved users yet. Add users from the form to quick-launch later.
                            </span>
                        }
                    />
                ) : (
                    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                        {users.map((user) => (
                            <Card
                                key={user.id}
                                className="glass-card hover:shadow-lg transition-all duration-200"
                                size="small"
                            >
                                <div className="space-y-2">
                                    {/* Header with Name and Actions */}
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {user.mcv_person_firstname_th} {user.mcv_person_lastname_th}
                                            </h3>
                                            <div className="flex gap-2 mt-1">
                                                <Tag color={getRoleColor(user.roles)}>{user.roles}</Tag>
                                                <Tag color={getEnvironmentColor(user.environment)}>
                                                    {user.environment.toUpperCase()}
                                                </Tag>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                type="text"
                                                icon={<EditOutlined />}
                                                onClick={() => onSelectUser(user)}
                                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                            >
                                                Edit
                                            </Button>
                                            <Popconfirm
                                                title="Delete user"
                                                description="Are you sure you want to remove this user from the list?"
                                                onConfirm={() => handleDelete(user.id!)}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Button
                                                    type="text"
                                                    danger
                                                    icon={<DeleteOutlined />}
                                                    className="hover:bg-red-50"
                                                >
                                                    Delete
                                                </Button>
                                            </Popconfirm>
                                        </div>
                                    </div>

                                    {/* User Details */}
                                    <div className="grid grid-cols-2 gap-2 text-sm bg-gray-50 p-3 rounded-lg">
                                        <div>
                                            <span className="text-gray-600">User ID:</span>
                                            <span className="ml-2 font-medium">{user.user_id}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Student ID:</span>
                                            <span className="ml-2 font-medium">{user.mcv_student_id}</span>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="text-gray-600">Course:</span>
                                            <span className="ml-2 font-medium">
                                                {user.mcv_course_courseno} - {user.context_title}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Semester:</span>
                                            <span className="ml-2 font-medium">{user.mcv_course_semester}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Year:</span>
                                            <span className="ml-2 font-medium">{user.mcv_course_year}</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    )
}
