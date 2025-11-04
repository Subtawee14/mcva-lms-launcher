'use client'

import { useState, useEffect } from 'react'
import { Form, Input, Radio, Button, Card, App, Select, Spin } from 'antd'
import { RocketOutlined, PlusOutlined, ClearOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons'
import * as jose from 'jose'
import axios from 'axios'
import type { UserData, Environment } from '../types'
import { ENVIRONMENT_MAP } from '../types'

interface LaunchFormProps {
    currentEnvironment: Environment
    onEnvironmentChange: (env: Environment) => void
    onAddToList: (user: UserData) => void
    prefilledData?: Partial<UserData>
}

export default function LaunchForm({
    currentEnvironment,
    onEnvironmentChange,
    onAddToList,
    prefilledData
}: LaunchFormProps) {
    const { modal, message } = App.useApp()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [verifyingPassword, setVerifyingPassword] = useState(false)

    // Update form when prefilled data changes
    useEffect(() => {
        if (prefilledData) {
            form.setFieldsValue({
                ...prefilledData,
                environment: currentEnvironment
            })
        }
    }, [prefilledData, currentEnvironment, form])

    const handleEnvironmentChange = (value: Environment) => {
        onEnvironmentChange(value)
        form.setFieldValue('environment', value)
    }

    const onSubmit = async (values: UserData) => {
        setLoading(true)
        try {
            if (currentEnvironment === 'prod') {
                const password = await new Promise<string>((resolve, reject) => {
                    modal.confirm({
                        title: 'Production Environment',
                        content: (
                            <div>
                                <Input.Password
                                    placeholder="Enter production password"
                                    id="prod-password"
                                />
                                {verifyingPassword && (
                                    <div className="mt-4 flex items-center gap-2 text-blue-600">
                                        <Spin indicator={<LoadingOutlined spin />} />
                                        <span>Verifying password...</span>
                                    </div>
                                )}
                            </div>
                        ),
                        okText: 'Launch',
                        cancelText: 'Cancel',
                        onOk: async () => {
                            const input = document.getElementById('prod-password') as HTMLInputElement
                            if (input?.value) {
                                setVerifyingPassword(true)
                                try {
                                    await axios.post('/api/verify-password', { password: input.value })
                                    resolve(input.value)
                                } catch (error) {
                                    setVerifyingPassword(false)
                                    throw error
                                }
                            } else {
                                reject(new Error('No password provided'))
                            }
                        },
                        onCancel: () => reject(new Error('Cancelled'))
                    })
                })
            }

            const secret = new TextEncoder().encode('SVHDuE943rf5a8ZXs')
            const token = await new jose.SignJWT(values as any)
                .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
                .sign(secret)

            // Create and submit hidden form
            const hiddenForm = document.createElement('form')
            hiddenForm.method = 'POST'
            hiddenForm.target = '_blank'
            hiddenForm.action = `${ENVIRONMENT_MAP[currentEnvironment].frontend}/api/connect`

            const input = document.createElement('input')
            input.type = 'hidden'
            input.name = 'token'
            input.value = token

            hiddenForm.appendChild(input)
            document.body.appendChild(hiddenForm)
            hiddenForm.submit()
            document.body.removeChild(hiddenForm)

            message.success('Launched successfully!')
        } catch (error: any) {
            if (error.message !== 'Cancelled') {
                message.error(error.response?.data?.name || 'Failed to launch')
            }
        } finally {
            setLoading(false)
        }
    }

    const handleAddToList = () => {
        const values = form.getFieldsValue()
        // Validate required fields
        const requiredFields = [
            'user_id', 'mcv_student_id', 'mcv_person_firstname_th',
            'mcv_person_lastname_th', 'mcv_course_courseno', 'mcv_course_cv_cid',
            'mcv_course_semester', 'mcv_course_year', 'context_title', 'context_label'
        ]

        const missingFields = requiredFields.filter(field => !values[field])
        if (missingFields.length > 0) {
            message.warning('Please fill all required fields before adding to list')
            return
        }

        onAddToList(values)
        message.success('Added to user list!')
    }

    const handleClear = () => {
        form.resetFields()
        form.setFieldValue('environment', currentEnvironment)
        message.info('Form cleared')
    }

    return (
        <Card className="glass-card">
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <UserOutlined className="text-blue-600" />
                    Launch Configuration
                </h2>
            </div>

            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    roles: 'STUDENT',
                    environment: 'prod'
                }}
                onFinish={onSubmit}
                className="space-y-1"
            >
                <Form.Item label="Environment" name="environment" required>
                    <Select
                        size="large"
                        onChange={handleEnvironmentChange}
                        value={currentEnvironment}
                        options={[
                            { value: 'local', label: '🖥️ Local' },
                            { value: 'dev', label: '🔧 Dev' },
                            { value: 'staging', label: '🎭 Staging' },
                            { value: 'preprod', label: '🚀 Preprod' },
                            { value: 'prod', label: '⭐ Prod' }
                        ]}
                    />
                </Form.Item>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        label="MyCourseVille User ID"
                        name="user_id"
                        rules={[{ required: true, message: 'Required' }]}
                    >
                        <Input size="large" placeholder="Enter user ID" />
                    </Form.Item>

                    <Form.Item
                        label="Student ID"
                        name="mcv_student_id"
                        rules={[{ required: true, message: 'Required' }]}
                    >
                        <Input size="large" placeholder="Enter student ID" />
                    </Form.Item>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        label="First Name (TH)"
                        name="mcv_person_firstname_th"
                        rules={[{ required: true, message: 'Required' }]}
                    >
                        <Input size="large" placeholder="ชื่อ" />
                    </Form.Item>

                    <Form.Item
                        label="Last Name (TH)"
                        name="mcv_person_lastname_th"
                        rules={[{ required: true, message: 'Required' }]}
                    >
                        <Input size="large" placeholder="นามสกุล" />
                    </Form.Item>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        label="Course Number"
                        name="mcv_course_courseno"
                        rules={[{ required: true, message: 'Required' }]}
                    >
                        <Input size="large" placeholder="e.g., 2110316" />
                    </Form.Item>

                    <Form.Item
                        label="MCV Course ID"
                        name="mcv_course_cv_cid"
                        rules={[{ required: true, message: 'Required' }]}
                    >
                        <Input size="large" placeholder="MCV Course ID" />
                    </Form.Item>
                </div>

                <Form.Item
                    label="Role"
                    name="roles"
                    rules={[{ required: true }]}
                >
                    <Radio.Group size="large">
                        <Radio.Button value="STUDENT">👨‍🎓 Student</Radio.Button>
                        <Radio.Button value="INSTRUCTOR">👨‍🏫 Instructor</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        label="Semester"
                        name="mcv_course_semester"
                        rules={[{ required: true, message: 'Required' }]}
                    >
                        <Input size="large" placeholder="e.g., 1, 2, 3" />
                    </Form.Item>

                    <Form.Item
                        label="Year"
                        name="mcv_course_year"
                        rules={[{ required: true, message: 'Required' }]}
                    >
                        <Input size="large" placeholder="e.g., 2567" />
                    </Form.Item>
                </div>

                <Form.Item
                    label="Course Name"
                    name="context_title"
                    rules={[{ required: true, message: 'Required' }]}
                >
                    <Input size="large" placeholder="Full course name" />
                </Form.Item>

                <Form.Item
                    label="Course Short Name"
                    name="context_label"
                    rules={[{ required: true, message: 'Required' }]}
                >
                    <Input size="large" placeholder="Short name" />
                </Form.Item>

                <div className="flex gap-3 pt-4">
                    <Button
                        type="primary"
                        htmlType="submit"
                        icon={<RocketOutlined />}
                        loading={loading}
                        size="large"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                        Launch
                    </Button>
                    <Button
                        icon={<PlusOutlined />}
                        onClick={handleAddToList}
                        size="large"
                        className="flex-1"
                    >
                        Add to List
                    </Button>
                    <Button
                        icon={<ClearOutlined />}
                        onClick={handleClear}
                        size="large"
                    >
                        Clear
                    </Button>
                </div>
            </Form>
        </Card>
    )
}
