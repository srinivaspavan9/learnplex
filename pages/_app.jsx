import { DokzProvider, GithubLink, ColorModeSwitch } from 'dokz/dist'
import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default (props) => {
  const { Component, pageProps } = props
  const router = useRouter()
  const path = router.asPath
  let titleInLowercase = path.slice(1, path.length)
  if (titleInLowercase === '') {
    titleInLowercase = 'about'
  }
  const title =
    titleInLowercase[0].toUpperCase() +
    titleInLowercase.slice(1, titleInLowercase.length) +
    ' - Learnplex Docs'
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <DokzProvider
        headerLogo={
          <>
            <img
              src="/logo.png"
              alt=""
              style={{ width: '50px', height: '50px' }}
            />
            &nbsp;Learnplex Docs
          </>
        }
        headerItems={[
          <GithubLink key="0" url="https://github.com/coderplex/learnplex" />,
          <ColorModeSwitch key="1" />,
        ]}
        sidebarOrdering={{
          'index.mdx': false,
          'about.mdx': true,
          'prerequisites.mdx': true,
          'installation.mdx': true,
          'contributing.mdx': true,
        }}
      >
        <Component {...pageProps} />
      </DokzProvider>
    </>
  )
}
