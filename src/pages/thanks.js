import React from "react"
import ThanksPage from "../modules/ThanksPage"

export const Head = () => {

  return (
    <>
      <title>{`Конверти Bair`}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no" />
      <meta name="google-site-verification" content="GN2zB7NWU3ANuQdgIqDXPz3GnnTSXRnY6oP5FCSfAjM" />
    </>
  )
}

const Thanks = () => {
  return (
    <ThanksPage />
  )
}

export default Thanks

