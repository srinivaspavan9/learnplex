import React, { useEffect, useState } from 'react'
import { message, Skeleton } from 'antd'
import dynamic from 'next/dynamic'

import { useAuthUser } from '../../lib/store'
import NotAuthenticated from '../../components/result/NotAuthenticated'
import { User, UserRole } from '../../graphql/types'
import NotAuthorized from '../../components/result/NotAuthorized'
import { getAllUsers } from '../../graphql/queries/user'
const ReactJson = dynamic(() => import('react-json-view'), { ssr: false })

const AllUsers = () => {
  const user = useAuthUser((state) => state.user)
  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    getAllUsers().then((result) => {
      if (result.error) {
        message.error(result.message)
      } else {
        setUsers(result)
      }
    })
  }, [])
  if (!user) return <NotAuthenticated />
  if (!user.roles?.includes(UserRole.Admin)) return <NotAuthorized />
  if (!process.browser) {
    return <Skeleton active={true} />
  }
  return <ReactJson src={users} collapsed={true} />
}
export default AllUsers
