import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, Input, Radio, Select } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentUserState, userListState } from '../recoil/atom';
import { v4 } from 'uuid';
import * as jose from 'jose';

const CustomForm: React.FC = () => {
  const [form] = Form.useForm();
  const [, setUsers] = useRecoilState(userListState);
  const currentUser = useRecoilValue(currentUserState);
  const [currentEnvironment, setCurrentEnvironment] = useState<string>(
    'http://localhost:3000/api/connect'
  );

  const onSubmit = async () => {
    if (!currentEnvironment) {
      alert('Please select environment');
      return;
    }
    const values = form.getFieldsValue();
    console.log(values);

    const secret = new TextEncoder().encode('secret-bo-be-assigned');

    const token = await new jose.SignJWT(values)
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .sign(secret);

    console.log(token);

    const hiddenForm = document.getElementById(
      'hidden-form'
    ) as HTMLFormElement;

    let hiddenInput = document.getElementsByName('token')[0];
    console.log('hiddenInput', hiddenInput);
    if (!hiddenInput) {
      hiddenInput = document.createElement('input');
      hiddenInput.setAttribute('type', 'hidden');
      hiddenInput.setAttribute('name', 'token');
      hiddenInput.setAttribute('value', token);
      hiddenForm.appendChild(hiddenInput);
    } else {
      hiddenInput.setAttribute('value', token);
    }

    hiddenForm.submit();
    hiddenForm.reset();
  };

  const addToList = () => {
    const values = form.getFieldsValue();
    setUsers((users: any) => [...users, { id: v4(), ...values }]);
  };

  const updateFormValues = useCallback(() => {
    form.setFieldsValue(currentUser);
  }, [currentUser, form]);

  useEffect(() => {
    updateFormValues();
  }, [currentUser, updateFormValues]);

  const clearForm = () => {
    form.resetFields();
  };

  const onEnvironmentChange = (e: any) => {
    setCurrentEnvironment(e.target.value);
  };

  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        layout="horizontal"
        initialValues={{
          roles: 'STUDENT',
          environment: 'http://localhost:3000/api/connect',
        }}
        size="middle"
        onFinish={onSubmit}
        onFinishFailed={() => alert('Please fill all required fields')}
      >
        <Form.Item label="Environment" name="environment" required>
          <Radio.Group onChange={onEnvironmentChange}>
            <Radio.Button value="http://localhost:3000/api/connect">
              Local
            </Radio.Button>
            <Radio.Button value="https://dev-map.mycourseville.com/api/connect">
              Dev
            </Radio.Button>
            <Radio.Button value="https://staging-map.mycourseville.com/api/connect">
              Staging
            </Radio.Button>
            <Radio.Button value="https://preprod-map.mycourseville.com/api/connect">
              Preprod
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="MyCourseVille User ID" name="user_id" required>
          <Input />
        </Form.Item>
        <Form.Item label="Student ID" name="mcv_student_id" required>
          <Input />
        </Form.Item>
        <Form.Item label="First Name" name="mcv_person_firstname_th" required>
          <Input />
        </Form.Item>
        <Form.Item label="Last Name" name="mcv_person_lastname_th" required>
          <Input />
        </Form.Item>
        <Form.Item label="Course Number" name="mcv_course_courseno" required>
          <Input />
        </Form.Item>
        <Form.Item label="Course ID" name="mcv_course_cv_cid" required>
          <Input />
        </Form.Item>
        <Form.Item label="Role" name="roles" required>
          <Radio.Group>
            <Radio.Button value="STUDENT">STUDENT</Radio.Button>
            <Radio.Button value="INSTRUCTOR">INSTRUCTOR</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Course Semester" name="mcv_course_semester" required>
          <Input />
        </Form.Item>
        <Form.Item label="Course Year" name="mcv_course_year" required>
          <Input />
        </Form.Item>
        <Form.Item label="Course Name" name="context_title" required>
          <Input />
        </Form.Item>
        <Form.Item label="Course Short Name" name="context_label" required>
          <Input />
        </Form.Item>
        <Form.Item label="Actions">
          <Button htmlType="submit" type="default" className="mr-3">
            Launch
          </Button>
          <Button type="default" onClick={addToList} className="mr-3">
            Add to List
          </Button>
          <Button type="default" onClick={clearForm}>
            Clear
          </Button>
        </Form.Item>
      </Form>
      <form
        id="hidden-form"
        method="POST"
        target="_blank"
        action={currentEnvironment}
      ></form>
    </>
  );
};

export default CustomForm;
