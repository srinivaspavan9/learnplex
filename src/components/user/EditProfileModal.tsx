import React from 'react'
import { Checkbox, Form, Input, message, Modal, Select } from 'antd'
import { useRouter } from 'next/router'

import { ProfileInput, User } from '../../graphql/types'
import { updateProfile } from '../../graphql/mutations/profile'

interface Props {
  visible: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  user: Partial<User>
}

const FORM_LAYOUT_LOCAL = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
    md: { span: 6 },
    lg: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
    md: { span: 18 },
    lg: { span: 18 },
  },
}

export default function EditProfileModal({
  visible,
  setShowModal,
  user,
}: Props) {
  const router = useRouter()
  const [form] = Form.useForm()

  const reset = () => {
    setShowModal(false)
    form.resetFields()
  }

  const onFinish = async ({
    shortBio,
    socialLinks,
    professionalDetails,
    technologies,
    isEmailPublic,
    profilePic,
  }: ProfileInput) => {
    const result = await updateProfile({
      shortBio,
      socialLinks,
      professionalDetails,
      technologies,
      isEmailPublic,
      profilePic,
    })
    if (result.error) {
      message.error(result.message, 5000)
      return
    }
    message.success('Details updated successfully')
    router.reload()
  }

  return (
    <Modal
      title={'Edit your profile'}
      visible={visible}
      onOk={() => form.submit()}
      onCancel={() => reset()}
      okText={'Save'}
      width={800}
    >
      <Form
        {...FORM_LAYOUT_LOCAL}
        form={form}
        initialValues={{
          shortBio: user.profile?.shortBio,
          socialLinks: user.profile?.socialLinks,
          professionalDetails: user.profile?.professionalDetails,
          technologies: user.profile?.technologies ?? [],
          hideEmail: !user.profile?.isEmailPublic,
          profilePic: user.profile?.profilePic,
        }}
        onFinish={({
          shortBio,
          socialLinks,
          professionalDetails,
          technologies,
          hideEmail,
          profilePic,
        }) =>
          onFinish({
            shortBio,
            socialLinks,
            professionalDetails,
            technologies,
            isEmailPublic: !hideEmail,
            profilePic,
          })
        }
      >
        <Form.Item name={'profilePic'} label={'Profile Pic URL'}>
          <Input placeholder={'https://example.com/my-profile-pic'} />
        </Form.Item>
        <Form.Item name={'shortBio'} label={'Short Bio'} rules={[{ max: 100 }]}>
          <Input.TextArea placeholder={'A short bio...'} />
        </Form.Item>
        <Form.Item name={['socialLinks', 'github']} label={'Github'}>
          <Input placeholder={'https://github.com/...'} />
        </Form.Item>
        <Form.Item name={['socialLinks', 'linkedin']} label={'Linked In'}>
          <Input placeholder={'https://linkedin.com/in/...'} />
        </Form.Item>
        <Form.Item name={['socialLinks', 'twitter']} label={'Twitter'}>
          <Input placeholder={'https://twitter.com/...'} />
        </Form.Item>
        <Form.Item
          name={['socialLinks', 'personalWebsite']}
          label={'Personal Website'}
        >
          <Input placeholder={'https://yoursite.com'} />
        </Form.Item>
        <Form.Item
          name={['professionalDetails', 'currentCompanyName']}
          label={'Company Name'}
        >
          <Input placeholder={'Coderplex'} />
        </Form.Item>
        <Form.Item
          name={['professionalDetails', 'currentRole']}
          label={'Company Role'}
        >
          <Input placeholder={'Software Engineer'} />
        </Form.Item>
        <Form.Item
          name={['professionalDetails', 'location']}
          label={'Location'}
        >
          <Input placeholder={'Hyderabad, India'} />
        </Form.Item>
        <Form.Item
          name={['professionalDetails', 'lookingForJob']}
          label={'Looking for job'}
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
        <Form.Item
          name={'hideEmail'}
          label={'Hide Email?'}
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
        <Form.Item name={'technologies'} label={'Technologies'}>
          <Select mode={'tags'} placeholder={'react,node'}>
            {[]}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}
