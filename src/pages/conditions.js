import * as React from "react"
import ConditionsPage from "../modules/ConditonsPage";
import { graphql } from "gatsby";


export const query = graphql`
    query IndexPage{
        strapiConditions {
            text
        }
    }
`

const Conditions = () => {
  return (
      <ConditionsPage />
  )
}

export default Conditions;



