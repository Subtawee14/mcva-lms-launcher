import React, { useEffect, useMemo, useState } from 'react';
import { Button, Form, Input, Radio, Select } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentUserState, userListState } from '../recoil/atom';
import { v4 } from 'uuid';
import * as jose from 'jose';

const CustomForm: React.FC = () => {
  const [form] = Form.useForm();
  const [courses, setCourses] = useState<any[]>([]);
  const [, setUsers] = useRecoilState(userListState);
  const currentUser = useRecoilValue(currentUserState);
  const [currentEnvironment, setCurrentEnvironment] =
    useState<keyof typeof mapUrl>('local');

  const mapUrl = useMemo(
    () => ({
      local: {
        frontend: 'http://localhost:3000',
        backend: 'http://localhost:4400'
      },
      dev: {
        frontend: 'https://dev-map.mycourseville.com',
        backend: 'https://api.dev-map.mycourseville.com'
      },
      staging: {
        frontend: 'https://staging-map.mycourseville.com',
        backend: 'https://ph63tct3gf.ap-southeast-1.awsapprunner.com'
      },
      preprod: {
        frontend: 'https://qpguiruhm3.ap-southeast-1.awsapprunner.com',
        backend: ''
      },
      prod: {
        frontend: 'https://map.mycourseville.com',
        backend: 'https://m9usmdhusg.ap-southeast-1.awsapprunner.com'
      }
    }),
    []
  );

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch(
        `${mapUrl[currentEnvironment].backend}/api/v1/courses`
      );
      const data = await response.json();
      setCourses(data.data);
    };
    fetchCourses();
  }, [currentEnvironment, mapUrl]);

  const onSubmit = async () => {
    if (!currentEnvironment) {
      alert('Please select environment');
      return;
    }
    const values = form.getFieldsValue();

    const secret = new TextEncoder().encode('SVHDuE943rf5a8ZXs');

    const token = await new jose.SignJWT(values)
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .sign(secret);

    const hiddenForm = document.getElementById(
      'hidden-form'
    ) as HTMLFormElement;

    let hiddenInput = document.getElementsByName('token')[0];
    hiddenForm.setAttribute(
      'action',
      `${
        mapUrl[values.environment as keyof typeof mapUrl].frontend
      }/api/connect`
    );
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

  useEffect(() => {
    console.log('currentUser', currentUser);
    form.setFieldsValue(currentUser);
  }, [currentUser, form]);

  const clearForm = () => {
    form.resetFields();
  };

  const onEnvironmentChange = (e: any) => {
    setCurrentEnvironment(e.target.value);
  };

  const handleSelectCourse = (value: string) => {
    const course = courses.find((course) => course.id === value);

    form.setFieldsValue({
      mcv_course_courseno: course.courseNumber,
      mcv_course_cv_cid: course.mcvCourseId,
      context_title: course.title,
      context_label: course.courseShortName,
      mcv_course_semester: course.semester,
      mcv_course_year: course.year
    });
  };

  return (
    <>
      <div
        style={{
          width: 300
        }}
      >
        <select onChange={(e) => handleSelectCourse(e.target.value)}>
          {courses.map((course: any) => (
            <option value={course.id} key={course.id}>
              {course.courseNumber} - {course.title}
            </option>
          ))}
        </select>
      </div>

      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        layout='horizontal'
        initialValues={{
          roles: 'STUDENT',
          environment: 'local'
        }}
        size='middle'
        onFinish={onSubmit}
        onFinishFailed={() => alert('Please fill all required fields')}
      >
        <Form.Item label='Environment' name='environment' required>
          <Radio.Group onChange={onEnvironmentChange}>
            <Radio.Button value='local'>Local</Radio.Button>
            <Radio.Button value='dev'>Dev</Radio.Button>
            <Radio.Button value='staging'>Staging</Radio.Button>
            <Radio.Button value='preprod'>Preprod</Radio.Button>
            <Radio.Button value='prod'>Prod</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item label='MyCourseVille User ID' name='user_id' required>
          <Input />
        </Form.Item>
        <Form.Item label='Student ID' name='mcv_student_id' required>
          <Input />
        </Form.Item>
        <Form.Item label='First Name' name='mcv_person_firstname_th' required>
          <Input />
        </Form.Item>
        <Form.Item label='Last Name' name='mcv_person_lastname_th' required>
          <Input />
        </Form.Item>
        <Form.Item label='Course Number' name='mcv_course_courseno' required>
          <Input />
        </Form.Item>
        <Form.Item label='Course ID' name='mcv_course_cv_cid' required>
          <Input />
        </Form.Item>
        <Form.Item label='Role' name='roles' required>
          <Radio.Group>
            <Radio.Button value='STUDENT'>STUDENT</Radio.Button>
            <Radio.Button value='INSTRUCTOR'>INSTRUCTOR</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label='Course Semester' name='mcv_course_semester' required>
          <Input />
        </Form.Item>
        <Form.Item label='Course Year' name='mcv_course_year' required>
          <Input />
        </Form.Item>
        <Form.Item label='Course Name' name='context_title' required>
          <Input />
        </Form.Item>
        <Form.Item label='Course Short Name' name='context_label' required>
          <Input />
        </Form.Item>
        <Form.Item label='Actions'>
          <Button htmlType='submit' type='default' className='mr-3'>
            Launch
          </Button>
          <Button type='default' onClick={addToList} className='mr-3'>
            Add to List
          </Button>
          <Button type='default' onClick={clearForm}>
            Clear
          </Button>
        </Form.Item>
      </Form>
      <form id='hidden-form' method='POST' target='_blank'></form>
    </>
  );
};

export default CustomForm;
