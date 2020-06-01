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
