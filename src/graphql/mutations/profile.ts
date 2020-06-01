import { ProfileInput } from '../types'
import { client } from '../../utils/urqlClient'

export async function updateProfile({
  shortBio,
  socialLinks,
  professionalDetails,
  technologies,
  isEmailPublic,
  profilePic,
}: ProfileInput) {
  const UPDATE_PROFILE_MUTATION = `
    mutation($data: ProfileInput!) {
      updateProfile(data: $data) {
        id
      }
    }
  `
  const result = await client
    .mutation(UPDATE_PROFILE_MUTATION, {
      data: {
        shortBio,
        socialLinks,
        professionalDetails,
        technologies,
        isEmailPublic,
        profilePic,
      },
    })
    .toPromise()

  if (result.error) {
    return {
      error: true,
      message: result.error.message,
    }
  }

  return result.data.updateProfile
}
