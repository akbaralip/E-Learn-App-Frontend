import React, { useEffect, useState } from 'react'
import axiosInstance from '../../AxiosInstance/AxiosIntercepter'
import ChefNavbar from './ChefNavbar'
import ChefFooter from './ChefFooter'
import './ChefStudentsList.css'
function ChefStudentsList() {
    const userid = localStorage.getItem('user_id')

    const [students, setStudents] = useState([])
    console.log('students====>>', students)
    const fetchStudents = async () => {
        try {
            const response = await axiosInstance.get(`api/chef_students_list/${userid}/`);
            setStudents(response.data)
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    }

    useEffect(() => {
        fetchStudents();
    }, [])

    return (
        <>
            <ChefNavbar />

            <div className="relative overflow-x-auto p-14 mt-12 mb-28">
                <h2 className='font-bold text-2xl text-gray-800'>Students List</h2>
                <table className='min-w-full' >
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.username}</td>
                                <td>{student.email}</td>
                                <td>{student.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ChefFooter />
        </>
    )
}

export default ChefStudentsList
