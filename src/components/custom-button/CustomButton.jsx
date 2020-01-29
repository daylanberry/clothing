import React from 'react'
import { invertedButtonStyles, GoogleSignInStyles, CustomButtonContainer} from './CustomButton.styles'


const CustomButton = ({ children, ...props }) => (
  <CustomButtonContainer {...props} >
    {children}
  </CustomButtonContainer>
)

export default CustomButton;