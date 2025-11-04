'use client'

import { useState, useEffect } from 'react'
import { ConfigProvider, Layout, Spin, Alert, App } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import CourseSearch from '@/src/components/CourseSearch'
import LaunchForm from '@/src/components/LaunchForm'
import SavedUsersList from '@/src/components/SavedUsersList'
import { useLocalStorage } from '@/src/hooks/useLocalStorage'
import type { Course, UserData, Environment } from '@/src/types'
import { ENVIRONMENT_MAP } from '@/src/types'

const { Header, Content } = Layout

export default function Home() {
    const [currentEnvironment, setCurrentEnvironment] = useState<Environment>('prod')
    const [courses, setCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [prefilledData, setPrefilledData] = useState<Partial<UserData>>({})

    const [savedUsers, setSavedUsers, isInitialized] = useLocalStorage<UserData[]>('mcva-saved-users', [])

    // Fetch courses when environment changes
    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await fetch(`${ENVIRONMENT_MAP[currentEnvironment].backend}/api/v1/courses`)
                if (!response.ok) {
                    throw new Error(`Failed to fetch courses: ${response.statusText}`)
                }
                const data = await response.json()
                setCourses(data.data || [])
            } catch (err: any) {
                console.error('Error fetching courses:', err)
                setError(err.message || 'Failed to fetch courses')
                setCourses([])
            } finally {
                setLoading(false)
            }
        }

        fetchCourses()
    }, [currentEnvironment])

    const handleSelectCourse = (course: Course) => {
        setPrefilledData({
            mcv_course_courseno: course.courseNumber,
            mcv_course_cv_cid: course.mcvCourseId,
            context_title: course.title,
            context_label: course.courseShortName,
            mcv_course_semester: course.semester,
            mcv_course_year: course.year
        })
    }

    const handleAddToList = (user: UserData) => {
        const userWithId = { ...user, id: uuidv4() }
        setSavedUsers([...savedUsers, userWithId])
    }

    const handleSelectUser = (user: UserData) => {
        setPrefilledData(user)
        setCurrentEnvironment(user.environment)
    }

    const handleDeleteUser = (id: string) => {
        setSavedUsers(savedUsers.filter(u => u.id !== id))
    }

    if (!isInitialized) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spin size="large" />
            </div>
        )
    }

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#2563eb',
                    borderRadius: 8
                }
            }}
        >
            <App>
                <Layout className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                    <Header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
                        <div className="flex items-center justify-between h-full">
                            <h1 className="text-white text-2xl font-bold flex items-center gap-3">
                            🎓 MyCourseVille Assessment Platform Launcher
                            </h1>
                            <div className="text-white text-sm bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                            Environment: <span className="font-semibold">{currentEnvironment.toUpperCase()}</span>
                            </div>
                        </div>
                    </Header>

                    <Content className="p-8">
                        <div className="max-w-[1800px] mx-auto">
                            {error && (
                                <Alert
                                    message="Error Loading Courses"
                                    description={error}
                                    type="error"
                                    closable
                                    onClose={() => setError(null)}
                                    className="mb-6"
                                />
                            )}

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Left Column: Course Search */}
                                <div className="lg:col-span-1">
                                    <Spin spinning={loading} tip="Loading courses..." size="large">
                                        <CourseSearch
                                            courses={courses}
                                            onSelectCourse={handleSelectCourse}
                                            currentEnvironment={currentEnvironment}
                                        />
                                    </Spin>
                                </div>

                                {/* Middle Column: Launch Form */}
                                <div className="lg:col-span-1">
                                    <LaunchForm
                                        currentEnvironment={currentEnvironment}
                                        onEnvironmentChange={setCurrentEnvironment}
                                        onAddToList={handleAddToList}
                                        prefilledData={prefilledData}
                                    />
                                </div>

                                {/* Right Column: Saved Users */}
                                <div className="lg:col-span-1">
                                    <SavedUsersList
                                        users={savedUsers}
                                        onSelectUser={handleSelectUser}
                                        onDeleteUser={handleDeleteUser}
                                    />
                                </div>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </App>
        </ConfigProvider>
    )
}
