import { useMutation } from 'urql'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { Skeleton } from 'antd'
import { useAuthUser } from '../lib/store'

export default function Logout() {
  const router = useRouter()
  const reset = useAuthUser((state) => state.reset)
  const LOGOUT_MUTATION = `
    mutation {
      logout
    }
  `
  const [, logout] = useMutation(LOGOUT_MUTATION)
  useEffect(() => {
    NProgress.start()
    logout().then(async (result) => {
      if (result.error) {
        console.error({ 'logout error': result.error })
      } else {
        reset()
        await router.push('/login')
      }
    })
    NProgress.done()
  }, [logout, reset, router])

  return <Skeleton active={true} />
}
