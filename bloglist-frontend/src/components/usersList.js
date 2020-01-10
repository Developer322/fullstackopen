import React from 'react'
import { connect } from 'react-redux'
import UserInfo from './UserInfo.js'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UsersForm = ({ users }) => 
    <>
        <h2>Users</h2>
        <Table>
          <tbody>
            <tr>
                <td></td>
                <td>blogs created</td>
            </tr>
            {
                users.map( user => <tr><td><Link to={`/users/${user.id.toString()}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr> )
            }
            </tbody>
        </Table>
    </>
  
  const mapStateToProps = state => ({
    users: state.users
  })
  
  export default connect(
    mapStateToProps
  )(UsersForm)