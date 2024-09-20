import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import {
    Box,
    Stepper,
    Step,
    StepLabel,
    Grid,
    FormHelperText,
    Button
} from '@mui/material';
import AccountDetails from "./AccountDetails";
import PersonalInfo from "./PersonalInfo";
import ReviewInfo from "./ReviewInfo";
import axios from 'axios';

const steps = ['Account Details', 'Personal Info', 'Review and Submit'];

const Form = () => {
    const [activeStep, setActiveStep] = useState(0);

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            phone: '',
            residence: ''
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .required('Email is required')
                .email('Invalid email'),
            password: Yup.string()
                .min(8, 'Password should be at least 8 characters'),
            confirmPassword: Yup.string()
                .min(8, 'Confirm password should be at least 8 characters')
                .oneOf([Yup.ref('password')], 'Passwords do not match'),
            firstName: Yup.string()
                .required('First name is required'),
            lastName: Yup.string()
                .required('Last name is required'),
        }),
        onSubmit: async (values) => {
            // API call on the last step (submit)
            try {
                await axios.post('/api/submit', values); // Replace with your API endpoint
                console.log('Form submitted successfully:', values);
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }
    });

    const handleNext = () => {
        // Validate the current step before proceeding to the next one
        if (activeStep === 0 && formik.values.email && formik.values.password && formik.values.confirmPassword) {
            setActiveStep((prevStep) => prevStep + 1);
        } else if (activeStep === 1 && formik.values.firstName && formik.values.lastName && formik.values.phone && formik.values.residence) {
            setActiveStep((prevStep) => prevStep + 1);
        } else if (activeStep === 2) {
            formik.handleSubmit(); // Submit on the final step
        } else {
            formik.setTouched({
                email: true,
                password: true,
                confirmPassword: true,
                firstName: true,
                lastName: true,
                phone: true,
                residence: true,
            }); // Show validation errors if any fields are invalid
        }
    };

    const formContent = (step) => {
        switch (step) {
            case 0:
                return <AccountDetails formik={formik} />;
            case 1:
                return <PersonalInfo formik={formik} />;
            case 2:
                return <ReviewInfo formik={formik} />;
            default:
                return <div>404: Not Found</div>;
        }
    };

    return (
        <Box
            sx={{
                maxWidth: '600px',
                padding: 2
            }}
        >
            <Stepper
                activeStep={activeStep}
                orientation="horizontal"
            >
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Grid container>
                <Grid
                    item
                    xs={12}
                    sx={{
                        padding: '20px'
                    }}
                >
                    {formContent(activeStep)}
                </Grid>
                {formik.errors.submit && (
                    <Grid
                        item
                        xs={12}
                    >
                        <FormHelperText error>
                            {formik.errors.submit}
                        </FormHelperText>
                    </Grid>
                )}

                <Grid
                    item
                    xs={12}
                >
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                    >
                        Back
                    </Button>

                    <Button onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Form;
