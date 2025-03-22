import CreateNewUserForm from '@/components/admin-users/administrator/CreateNewUserForm'
import React from 'react'

const EditUserPage = () => {
  return (
    <div>
        <CreateNewUserForm isEditing={true}/>
    </div>
  )
}

export default EditUserPage