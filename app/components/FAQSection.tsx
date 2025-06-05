// HAS SOME UI ISSUES WITH NEIGHBORING SECTIONS

import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  SvgIcon,
} from '@mui/material';
import {
  ExpandMore,
  Add,
  Remove,
  ExpandLess,
  ExpandLessTwoTone,
} from '@mui/icons-material';
import { ComponentConfig } from '@measured/puck';

interface FAQItem {
  question: string;
  answer?: string;
}

interface FAQProps {
  title: string;
  faqs: FAQItem[];
}

// Component
export const FAQSection: React.FC<FAQProps> = ({ title, faqs }) => {
  const [expanded, setExpanded] = React.useState<number | false>(0);

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box
      component="section"
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        py: 10,
        px: 2,
        maxWidth: 640,
        mx: 'auto',
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        align="center"
        fontWeight="semibold"
        gutterBottom
      >
        {title}
      </Typography>

      <Box mt={6}>
        {faqs.length > 0 &&
          faqs.map(({ question, answer }, index) => (
            <Accordion
              key={index}
              expanded={expanded === index}
              onChange={handleChange(index)}
              sx={{
                border: 2,
                borderColor: 'divider',
                borderRadius: 1,
                mb: 2,
                '&:before': { display: 'none' }, // Remove default divider line
                bgcolor:
                  expanded === index ? 'action.selected' : 'background.paper',
              }}
            >
              <AccordionSummary
                expandIcon={
                  expanded === index ? (
                    <Remove
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'common.white',
                        borderRadius: '50%',
                      }}
                    />
                  ) : (
                    <ExpandMore
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'common.white',
                        borderRadius: '50%',
                      }}
                    />
                  )
                }
                sx={{
                  px: 4,
                  py: 3,
                  '& .MuiAccordionSummary-content': {
                    margin: 0,
                  },
                }}
              >
                <Typography
                  fontWeight="semibold"
                  color="text.primary"
                  sx={{ fontSize: { xs: '1rem', lg: '1.125rem' } }}
                >
                  {question}
                </Typography>
              </AccordionSummary>
              {answer && (
                <>
                  <Box
                    component="hr"
                    sx={{
                      borderColor: 'divider',
                      mx: 4,
                    }}
                  />
                  <AccordionDetails
                    sx={{
                      px: 4,
                      py: 3,
                      color: 'text.secondary',
                      fontSize: '0.875rem',
                    }}
                  >
                    <Typography>{answer}</Typography>
                  </AccordionDetails>
                </>
              )}
            </Accordion>
          ))}
      </Box>
    </Box>
  );
};

export interface FaqSectionProps {
  title: string;
  faqs: { question: string; answer: string }[];
}

// Puck config definition for this component:
export const FaqSectionConfig: ComponentConfig<FaqSectionProps> = {
  label: 'FAQ Section',
  fields: {
    title: {
      label: 'Section Title',
      type: 'text',
    },
    faqs: {
      label: 'FAQs',
      type: 'array',
      arrayFields: {
        question: { label: 'Question', type: 'text' },
        answer: { label: 'Answer', type: 'text' },
      },
    },
  },
  defaultProps: {
    title: 'Frequently asked questions',
    faqs: [
      {
        question: 'How i can play for my appoinment ?',
        answer:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas eaque nobis, fugit odit omnis fugiat deleniti animi ab maxime cum laboriosam recusandae facere dolorum veniam quia pariatur obcaecati illo ducimus?',
      },
      {
        question:
          'Is the cost of the appoinment covered by private health insurance?',
        answer: 'add answer here...',
      },
      {
        question: 'Do i need a referral?',
        answer: 'add answer here...',
      },
      {
        question: 'What are your opening house?',
        answer: 'add answer here...',
      },
      {
        question: 'What can i expect at my first consultation?',
        answer: 'add answer here...',
      },
    ],
  },
  render: (props: FAQProps) => <FAQSection {...props} />,
};
