import { Alert, Box, CircularProgress, TextField } from '@mui/material'
import React, { useState } from 'react'
import { BlackButton } from '../../components'

const OtpForm = ({ onNext, isSubmitting }) => {
    const [otp, setOtp] = useState("")

    const onSubmit = () => {
        onNext(otp);
    }
    return (
        <>
            <TextField value={otp} onChange={e => setOtp(e.target.value)} type='number' label="OTP" />
            <BlackButton disabled={isSubmitting} onClick={onSubmit}>
                {isSubmitting ?
                    <Box>
                        <CircularProgress size={20} />
                    </Box> : <>Verify</>}
            </BlackButton>
        </>
    )
}

export default OtpForm