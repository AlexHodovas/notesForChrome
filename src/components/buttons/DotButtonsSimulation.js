import React from "react"
import Box from "@material-ui/core/Box"
import { styled, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
  dot: {
    display: "inline-block",
    width: 10,
    height: 10,
    background: "#f9f9f9",
    borderRadius: "50%",
    margin: "12px 8px 0 0",
  },
}))

const DotsContainer = styled(Box)({
  marginLeft: 10,
})

const RedCircle = styled(Box)({
  background: "#FF6057",
  border: "1px solid #E14640",
})

const AmberCircle = styled(Box)({
  background: "#FFBD2E",
  border: "1px solid #DFA123",
})

const GreenCircle = styled(Box)({
  background: "#27C93F",
  border: "1px solid #1DAD2B",
})

const DotButtonsSimulation = () => {
  const classes = useStyles()

  return (
    <DotsContainer>
      <RedCircle className={classes.dot} />
      <AmberCircle className={classes.dot} />
      <GreenCircle className={classes.dot} />
    </DotsContainer>
  )
}

export default DotButtonsSimulation