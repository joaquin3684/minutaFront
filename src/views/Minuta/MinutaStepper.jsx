import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";

const styles = theme => ({
  root: {
    width: "90%"
  },
  button: {
    marginRight: theme.spacing.unit
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  completed: {
    display: "inline-block"
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

function getSteps() {
  return ["Detalles", "Temas", "Responsabilidades"];
}

function MinutaStepper(props) {
  const steps = getSteps();

  return (
    <Stepper alternativeLabel nonLinear activeStep={props.activeStep}>
      {steps.map((label, index) => {
        return (
          <Step key={label} {...props}>
            <StepButton onClick={() => props.onChangeStep(index)}>
              {label}
            </StepButton>
          </Step>
        );
      })}
    </Stepper>
  );
}

export default withStyles(styles)(MinutaStepper);
