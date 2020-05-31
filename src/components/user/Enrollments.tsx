import { useQuery } from 'urql'
import React from 'react'
import { Skeleton } from 'antd'

import NotAuthenticated from '../../components/result/NotAuthenticated'
import InternalServerError from '../../components/result/InternalServerError'
import { Progress } from '../../graphql/types'
import ResourceCards from '../../components/learn/ResourceCards'
import { useAuthUser } from '../../lib/store'

export default function Enrollments() {
  const USER_PROGRESS_LIST_QUERY = `
    query {
      userProgressList {
        resource {
          id
          title
          description
          slug
          user {
            username
          }
          topic {
            title
            slug
          }
          firstPageSlugsPath
          verified
        }
      }
    }
  `
  const [
    { data: progressData, fetching: progressFetching, error: progressError },
  ] = useQuery({
    query: USER_PROGRESS_LIST_QUERY,
  })
  const user = useAuthUser((state) => state.user)

  if (progressFetching) {
    return <Skeleton active={true} />
  }

  if (!user) {
    return <NotAuthenticated />
  }

  if (progressError) {
    return <InternalServerError />
  }

  const progressList = progressData.userProgressList
  const resources = progressList.map((progress: Progress) => progress.resource)

  return <ResourceCards resources={resources} />
}
