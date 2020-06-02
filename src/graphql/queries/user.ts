import { client } from '../../utils/urqlClient'

export async function getUserWithProfileByUsername({
  username,
}: {
  username: string
}) {
  const USER_BY_USERNAME_QUERY = `
    query($username: String!) {
      userByUsername(username: $username) {
        id
        name
        email
        username
        profile {
          id
          shortBio
          technologies
          profilePic
          socialLinks {
            github
            linkedin
            twitter
            personalWebsite
          }
          professionalDetails {
            currentCompanyName
            currentRole
            lookingForJob
            location
          }
          isEmailPublic
        }
        createdDate
      }
    }
  `
  const result = await client
    .query(USER_BY_USERNAME_QUERY, { username })
    .toPromise()
  if (result.error) {
    return {
      error: true,
      message: result.error.message,
    }
  }
  return result.data.userByUsername
}

export async function getAllUsers() {
  const USERS_QUERY = `
    query {
      users {
        id
        name
        email
        username
        confirmed
        roles
        githubId
        resources {
          title
        }
        progressList {
          resource {
            title
          }
          completedSections {
            title
          }
        }
        createdDate
        updatedDate
        profile {
          shortBio
          profilePic
          technologies
          socialLinks {
            github
            twitter
            linkedin
            personalWebsite
          }
          isEmailPublic
          professionalDetails {
            currentCompanyName
            currentRole
            lookingForJob
            location
          }
          createdDate
          updatedDate
        }
      }
    }
  `
  const result = await client.query(USERS_QUERY).toPromise()
  if (result.error) {
    return {
      error: true,
      message: result.error.message,
    }
  }
  return result.data.users
}
