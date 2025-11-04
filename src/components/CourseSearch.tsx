'use client'

import { useState, useMemo, useRef } from 'react'
import { Input, Select, Card, Empty, Badge, Button, Form } from 'antd'
import { SearchOutlined, BookOutlined } from '@ant-design/icons'
import type { Course } from '../types'

const { Option } = Select

interface CourseSearchProps {
    courses: Course[]
    onSelectCourse: (course: Course) => void
    currentEnvironment: string
}

export default function CourseSearch({ courses, onSelectCourse, currentEnvironment }: CourseSearchProps) {
    const searchInputRef = useRef<any>(null)
    const [searchText, setSearchText] = useState('')
    const [filterSemester, setFilterSemester] = useState<string>('all')
    const [filterYear, setFilterYear] = useState<string>('all')

    // Extract unique semesters and years for filters
    const { semesters, years } = useMemo(() => {
        const semesterSet = new Set<string>()
        const yearSet = new Set<string>()

        courses.forEach(course => {
            if (course.semester) semesterSet.add(course.semester)
            if (course.year) yearSet.add(course.year)
        })

        return {
            semesters: Array.from(semesterSet).sort(),
            years: Array.from(yearSet).sort((a, b) => parseInt(b) - parseInt(a))
        }
    }, [courses])

    // Handle search button click
    const handleSearch = () => {
        const value = searchInputRef.current?.input?.value || ''
        setSearchText(value)
    }

    // Handle clear
    const handleClear = () => {
        if (searchInputRef.current) {
            searchInputRef.current.input.value = ''
        }
        setSearchText('')
    }

    // Filter courses based on search text and filters
    const filteredCourses = useMemo(() => {
        return courses.filter(course => {
            // Text search across multiple fields
            const searchLower = searchText.toLowerCase()
            const matchesSearch = searchText === '' ||
                course.courseNumber?.toLowerCase().includes(searchLower) ||
                course.title?.toLowerCase().includes(searchLower) ||
                course.courseShortName?.toLowerCase().includes(searchLower) ||
                course.mcvCourseId?.toLowerCase().includes(searchLower)

            // Semester filter
            const matchesSemester = filterSemester === 'all' || course.semester === filterSemester

            // Year filter
            const matchesYear = filterYear === 'all' || course.year === filterYear

            return matchesSearch && matchesSemester && matchesYear
        })
    }, [courses, searchText, filterSemester, filterYear])

    return (
        <div className="space-y-4">
            <Card className="glass-card">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <BookOutlined className="text-blue-600 text-xl" />
                        <h3 className="text-lg font-semibold text-gray-800">Search Courses</h3>
                        <Badge count={filteredCourses.length} className="ml-auto" showZero />
                    </div>

                    {/* Search Input */}
                    <Form onFinish={handleSearch}>
                        <div className="flex gap-2">
                            <Input
                                ref={searchInputRef}
                                size="large"
                                placeholder="Search by course number, title, or short name..."
                                prefix={<SearchOutlined className="text-gray-400" />}
                                defaultValue=""
                                onPressEnter={handleSearch}
                                className="rounded-lg flex-1"
                                allowClear
                                onClear={handleClear}
                            />
                            <Button
                                type="primary"
                                size="large"
                                icon={<SearchOutlined />}
                                onClick={handleSearch}
                                className="bg-gradient-to-r from-blue-600 to-indigo-600"
                            >
                                Search
                            </Button>
                        </div>
                    </Form>

                    {/* Filters */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                            <Select
                                size="large"
                                value={filterSemester}
                                onChange={setFilterSemester}
                                className="w-full"
                            >
                                <Option value="all">All Semesters</Option>
                                {semesters.map(sem => (
                                    <Option key={sem} value={sem}>Semester {sem}</Option>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                            <Select
                                size="large"
                                value={filterYear}
                                onChange={setFilterYear}
                                className="w-full"
                            >
                                <Option value="all">All Years</Option>
                                {years.map(year => (
                                    <Option key={year} value={year}>{year}</Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Course List */}
            <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
                {filteredCourses.length === 0 ? (
                    <Card className="glass-card">
                        <Empty
                            description={
                                <span className="text-gray-500">
                                    {courses.length === 0
                                        ? `No courses available in ${currentEnvironment} environment`
                                        : 'No courses found matching your search criteria'}
                                </span>
                            }
                        />
                    </Card>
                ) : (
                    filteredCourses.map(course => (
                        <Card
                            key={course.id}
                            className="glass-card hover:shadow-xl transition-all duration-200 cursor-pointer hover:scale-[1.02]"
                            onClick={() => onSelectCourse(course)}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-blue-600">{course.courseNumber}</span>
                                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                            {course.courseShortName}
                                        </span>
                                    </div>
                                    <h4 className="font-medium text-gray-800 mb-1">{course.title}</h4>
                                    <div className="flex gap-3 text-sm text-gray-600">
                                        <span>📅 Semester {course.semester}</span>
                                        <span>📆 Year {course.year}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
