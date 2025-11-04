export type Environment = 'local' | 'dev' | 'staging' | 'preprod' | 'prod'

export type Role = 'STUDENT' | 'INSTRUCTOR'

export interface Course {
    id: string
    courseNumber: string
    mcvCourseId: string
    title: string
    courseShortName: string
    semester: string
    year: string
}

export interface UserData {
    id?: string
    environment: Environment
    user_id: string
    mcv_student_id: string
    mcv_person_firstname_th: string
    mcv_person_lastname_th: string
    mcv_course_courseno: string
    mcv_course_cv_cid: string
    roles: Role
    mcv_course_semester: string
    mcv_course_year: string
    context_title: string
    context_label: string
}

export interface EnvironmentUrls {
    frontend: string
    backend: string
}

export const ENVIRONMENT_MAP: Record<Environment, EnvironmentUrls> = {
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
        backend: 'https://f8jgbq3abz.ap-southeast-1.awsapprunner.com'
    },
    prod: {
        frontend: 'https://map.mycourseville.com',
        backend: 'https://m9usmdhusg.ap-southeast-1.awsapprunner.com'
    }
}
