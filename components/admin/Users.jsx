'use client'
import React, {useContext, useEffect} from 'react'
import styles from '@/styles/adminProduct.module.css';
import Link from 'next/link';
import CustomPagination from '../pagination/CustomPagination';
import AuthContext from '@/context/AuthContext'

const Users = ({data}) => {

    const { error, clearErrors, deleteUser } = useContext(AuthContext);

    useEffect(() => {

        if (error) {
          toast.error(error);
          clearErrors();
        }
      }, [error]);

      const deleteHandler = (id) => {
        deleteUser(id)
      }

    return (
        <div className={styles.tableWrapper}>
            <h2>{
                    data
                        ?.usersCount
                } Users</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data
                            ?.users
                                    ?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.role}</td>
                                            <td>
                                                <div className={styles.buttonContainer}>
                                                    <Link
                                                        href={`/admin/users/${item?._id}`}
                                                        style={{
                                                            "textDecoration" : "none",
                                                            "color" : 'inherit'
                                                        }}>
                                                        <button>Edit</button>
                                                    </Link>
                                                    
                                                        
                                                        <button onClick={()=>deleteHandler(item?._id)}>Delete</button>
                                                    
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                    }
                </tbody>
            </table>
            <CustomPagination
                resPerPage={data
                    ?.resPerPage}
                productsCount={data
                    ?.usersCount}/>
        </div>
    )
}

export default Users