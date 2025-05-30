import React from 'react'; // Add this line
import { Config } from "@measured/puck";
import { CustomLink, CustomLinkProps } from "./app/components/CustomLink";
import { defaultNavItems, defaultLogo, Header, HeaderProps } from "./app/components/templateA/Header";
import { HeroSectionAProps, defaultButtons, HeroSectionA } from "./app/components/templateA/HeroSectionA";
import { Categories, CategoriesProps, defaultSectionButtons } from "./app/components/templateA/Categories";
import { ContactSection, ContactSectionProps, defaultSubmitButton } from "./app/components/templateA/ContactSection";
import { FooterAProps, FooterA } from "./app/components/templateA/Footer";
import { MuiColorInput } from "mui-color-input";
import { Button } from '@mui/material';
// import { NavbarConfig, NavbarProps } from "./app/components/Navbar";
// import { HeroSectionConfig, HeroSectionProps } from "./app/components/HeroSection";
// import { FeatureSectionConfig, FeatureSectionProps } from "./app/components/FeatureSection";
// import { FooterConfig, FooterProps } from "./app/components/Footer";
// import { TestimonialsSectionConfig, TestimonialsSectionProps } from "./app/components/Testimonials";
// import TabNavigationConfig, { TabNavigationProps } from "./app/components/TabNavigation";
// import { AdvancedTablePuckConfig, AdvancedTableProps } from "./app/components/AdvancedTable";
// import { ProfileConfig, ProfileProps } from "./app/components/Profile";
// import { CardAConfig, CardAProps, CardBConfig, CardBProps, CardCConfig, CardCProps } from "./app/components/cards";
// import { FaqSectionConfig, FaqSectionProps } from "./app/components/FAQSection";
// import { ExecutiveTeamConfig, ExecutiveTeamProps } from "./app/components/ExecutiveTeam";
// import { DynamicButtonConfig, DynamicButtonProps } from "./app/components/DynamicButton";
// import { ColorPickerConfig, ColorPickerProps } from "./app/components/ColorPicker";

// Define the Components type
type Components = {
  Header?: HeaderProps;
  HeroSectionA?: HeroSectionAProps;
  Categories?: CategoriesProps;
  ContactSection?: ContactSectionProps;
  FooterA?: FooterAProps;
  CustomLink?: CustomLinkProps;

  // Navbar?: NavbarProps;
  // HeroSection?: HeroSectionProps;
  // FeatureSection?: FeatureSectionProps;
  // ExecutiveTeam?: ExecutiveTeamProps;
  // FAQ?: FaqSectionProps;
  // Footer?: FooterProps;
  // Testimonials?: TestimonialsSectionProps;
  // TabNavigation?: TabNavigationProps;
  // AdvancedTable?: AdvancedTableProps;
  // Profile?: ProfileProps;
  // CardA?: CardAProps;
  // CardB?: CardBProps;
  // CardC?: CardCProps;

  // ColorPicker?: ColorPickerProps;
  // DynamicButton?: DynamicButtonProps;

  HeadingBlock: {
    title: string;
    color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | string;
  };
};

// Define the customConfig type
export const customConfig: Config<Components> = {
  components: {
    HeadingBlock: {
      fields: {
        title: {
          type: "text",
        },
        color: {
          label: 'Color',
          type: 'select',
          options: [
            { value: 'red', label: 'Red' },
            { value: 'blue', label: 'Blue' },
            { value: 'green', label: 'Green' },
            // { value: 'primary', label: 'Primary' },
            // { value: 'secondary', label: 'Secondary' },
            // { value: 'error', label: 'Error' },
            // { value: 'warning', label: 'Warning' },
            // { value: 'info', label: 'Info' },
            // { value: 'success', label: 'Success' }
          ]
        },
      },
      defaultProps: {
        title: 'Button',
        color: "black",
      },
      render: ({ title, color }) => {
        return (<>
          <p style={{ color: color }}>Paragraph</p>
          <Button variant='contained' sx={{ color: color }} onCanPlay={() => console.log('btn clicked')}>{title}</Button>;
        </>)
      },
    },
    CustomLink: {
      label: 'Custom Link',
      fields: {
        href: {
          label: 'URL',
          type: 'text',
        },
        children: {
          label: 'Text',
          type: 'text',
        },
        variant: {
          label: 'Variant',
          type: 'radio',
          options: [
            { value: 'body1', label: 'Body 1' },
            { value: 'body2', label: 'Body 2' },
            { value: 'button', label: 'Button' },
            { value: 'caption', label: 'Caption' },
            { value: 'h1', label: 'H1' },
            { value: 'h2', label: 'H2' },
            { value: 'h3', label: 'H3' },
            { value: 'h4', label: 'H4' },
            { value: 'h5', label: 'H5' },
            { value: 'h6', label: 'H6' },
            { value: 'inherit', label: 'Inherit' },
            { value: 'overline', label: 'Overline' },
            { value: 'subtitle1', label: 'Subtitle 1' },
            { value: 'subtitle2', label: 'Subtitle 2' },
            { value: 'text', label: 'Text' },
            { value: 'outlined', label: 'Outlined' },
            { value: 'contained', label: 'Contained' },
          ],
        },
        color: {
          label: 'Color',
          type: 'select',
          options: [
            { value: 'default', label: 'Default' },
            { value: 'primary', label: 'Primary' },
            { value: 'secondary', label: 'Secondary' },
            { value: 'success', label: 'Success' },
            { value: 'error', label: 'Error' },
            { value: 'info', label: 'Info' },
            { value: 'warning', label: 'Warning' },
            { value: 'textPrimary', label: 'Text Primary' },
            { value: 'textSecondary', label: 'Text Secondary' },
            { value: 'textDisabled', label: 'Text Disabled' },
          ],
        },
        underline: {
          label: 'Underline',
          type: 'radio',
          options: [
            { value: 'always', label: 'Always' },
            { value: 'hover', label: 'Hover' },
            { value: 'none', label: 'None' },
          ],
        },
        // sx is not configurable via Puck in this example
      },
      defaultProps: {
        href: '#',
        children: 'Link Text',
        variant: 'body1', // Changed to a valid variant
        color: 'primary',
        underline: 'always' as const,
      },
      render: (props: CustomLinkProps) => (
        <CustomLink {...props} />
      )
    },
    Header: {
      label: "Header",
      fields: {
        logo: {
          type: "object",
          label: "Logo",
          objectFields: {
            label: { type: "text", label: "Label" },
            image: { type: "text", label: "Image URL" },
            href: { type: "text", label: "URL" },
            width: { type: "number", label: "Width" },
            height: { type: "number", label: "Height" },
            color: {
              type: "custom",
              label: "Color",
              render: ({ value, onChange }: { value: any, onChange: any }) => (
                <MuiColorInput
                  value={value}
                  onChange={onChange}
                  label="Logo Color"
                />
              ),
            } as any,
          }
        },
        backgroundColor: {
          type: "custom",
          label: "Background Color",
          render: ({ value, onChange }: { value: any, onChange: any }) => (
            <MuiColorInput
              value={value}
              onChange={onChange}
              label="Background Color"
            />
          ),
        } as any,
        navItems: {
          type: "array",
          label: "Navigation Items",
          getItemSummary: (item: any) => item.text,
          arrayFields: {
            text: { type: "text", label: "Label" },
            href: { type: "text", label: "URL" },
            variant: {
              type: "radio",
              label: "Variant",
              options: [
                { value: "contained", label: "Contained" },
                { value: "outlined", label: "Outlined" },
                { value: "text", label: "Text" }
              ]
            },
            textColor: {
              type: "custom",
              label: "Text Color",
              render: ({ value, onChange }: { value: any, onChange: any }) => (
                <MuiColorInput
                  value={value}
                  onChange={onChange}
                  label="Text Color"
                />
              ),
            } as any,
            color: {
              type: "custom",
              label: "Button Color",
              render: ({ value, onChange }: { value: any, onChange: any }) => (
                <MuiColorInput
                  value={value}
                  onChange={onChange}
                  label="Button Color"
                />
              ),
            } as any,
            size: {
              type: "radio",
              label: "Size",
              options: [
                { value: "small", label: "Small" },
                { value: "medium", label: "Medium" },
                { value: "large", label: "Large" }
              ]
            },
            fullWidth: {
              type: "select",
              label: "Full Width",
              options: [
                { value: true, label: "True" },
                { value: false, label: "False" }
              ]
            },
            disableElevation: {
              type: "select",
              label: "Disable Elevation",
              options: [
                { value: true, label: "True" },
                { value: false, label: "False" }
              ]
            }
          }
        }
      },
      defaultProps: {
        logo: defaultLogo,
        backgroundColor: "#ffffff",
        navItems: defaultNavItems
      },
      render: (props: HeaderProps) => <Header {...props} />,
    },
    HeroSectionA: {
      label: "Hero Section",
      fields: {
        heading: { type: "text", label: "Heading" },
        subheading: { type: "text", label: "Subheading" },
        backgroundColor: {
          type: "custom",
          label: "Background Color",
          render: ({ value, onChange }: { value: any, onChange: any }) => (
            <MuiColorInput
              value={value}
              onChange={onChange}
              label="Background Color"
            />
          ),
        } as any,
        headingColor: {
          type: "custom",
          label: "Heading Color",
          render: ({ value, onChange }: { value: any, onChange: any }) => (
            <MuiColorInput
              value={value}
              onChange={onChange}
              label="Heading Color"
            />
          ),
        } as any,
        subheadingColor: {
          type: "custom",
          label: "Subheading Color",
          render: ({ value, onChange }: { value: any, onChange: any }) => (
            <MuiColorInput
              value={value}
              onChange={onChange}
              label="Subheading Color"
            />
          ),
        } as any,
        buttons: {
          type: "array",
          label: "Buttons",
          getItemSummary: (item: any) => item.text,
          arrayFields: {
            text: { type: "text", label: "Text" },
            href: { type: "text", label: "URL" },
            variant: {
              type: "radio",
              label: "Variant",
              options: [
                { value: "contained", label: "Contained" },
                { value: "outlined", label: "Outlined" },
                { value: "text", label: "Text" }
              ]
            },
            textColor: {
              type: "custom",
              label: "Color",
              render: ({ value, onChange }: { value: any, onChange: any }) => (
                <MuiColorInput
                  value={value}
                  onChange={onChange}
                  label="Text Color"
                />
              ),
            } as any,
            color: {
              type: "custom",
              label: "Color",
              render: ({ value, onChange }: { value: any, onChange: any }) => (
                <MuiColorInput
                  value={value}
                  onChange={onChange}
                  label="Button Color"
                />
              ),
            } as any,
            size: {
              type: "radio",
              label: "Size",
              options: [
                { value: "small", label: "Small" },
                { value: "medium", label: "Medium" },
                { value: "large", label: "Large" }
              ]
            },
            fullWidth: {
              type: "select",
              label: "Full Width",
              options: [
                { value: true, label: "True" },
                { value: false, label: "False" }
              ]
            },
            disableElevation: {
              type: "select",
              label: "Disable Elevation",
              options: [
                { value: true, label: "True" },
                { value: false, label: "False" }
              ]
            }
          }
        }
      },
      defaultProps: {
        heading: "Write your Headline here",
        subheading: "Lorem ipsum dolor sit amet...",
        buttons: defaultButtons,
        backgroundColor: "#1976d2",
        headingColor: "#ffffff",
        subheadingColor: "#e0e0e0"
      },
      render: (props: HeroSectionAProps) => <HeroSectionA {...props} />,
    },
    Categories: {
      label: "Categories Section",
      fields: {
        heading: { type: "text", label: "First Section Heading" },
        subheading: { type: "textarea", label: "First Section Subheading" },
        headline: { type: "text", label: "Second Section Heading" },
        description: { type: "textarea", label: "Second Section Subheading" },
        sectionButtons: {
          type: "array",
          label: "Second Section Buttons",
          getItemSummary: (item: any) => item.text,
          arrayFields: {
            text: { type: "text", label: "Text" },
            href: { type: "text", label: "URL" },
            variant: {
              type: "radio",
              label: "Variant",
              options: [
                { value: "contained", label: "Contained" },
                { value: "outlined", label: "Outlined" },
                { value: "text", label: "Text" }
              ]
            },
            textColor: {
              type: "custom",
              label: "Text Color",
              render: ({ value, onChange }: { value: any, onChange: any }) => (
                <MuiColorInput
                  value={value}
                  onChange={onChange}
                  label="Text Color"
                />
              ),
            } as any,
            color: {
              type: "custom",
              label: "Button Color",
              render: ({ value, onChange }: { value: any, onChange: any }) => (
                <MuiColorInput
                  value={value}
                  onChange={onChange}
                  label="Button Color"
                />
              ),
            } as any,
            size: {
              type: "radio",
              label: "Size",
              options: [
                { value: "small", label: "Small" },
                { value: "medium", label: "Medium" },
                { value: "large", label: "Large" }
              ]
            },
            fullWidth: {
              type: "select",
              label: "Full Width",
              options: [
                { value: true, label: "True" },
                { value: false, label: "False" }
              ]
            },
            disableElevation: {
              type: "select",
              label: "Disable Elevation",
              options: [
                { value: true, label: "True" },
                { value: false, label: "False" }
              ]
            }
          }
        },
        sectionImage: { type: "text", label: "Second Section Image URL" },
        backgroundColor: {
          type: "custom",
          label: "Background Color",
          render: ({ value, onChange }: { value: any, onChange: any }) => (
            <MuiColorInput
              value={value}
              onChange={onChange}
              label="Background Color"
            />
          ),
        } as any,
      },
      defaultProps: {
        heading: "All Categories",
        subheading: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren.",
        headline: "Write your Headline here",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor\nLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor",
        sectionButtons: defaultSectionButtons,
        sectionImage: "https://edmingle.b-cdn.net/edmingle_websitebuilder/sitebuilder/assets/designs/images/edmingle/meeting-clipped.png",
        backgroundColor: "#ffffff"
      },
      render: (props: CategoriesProps) => <Categories {...props} />,
    },
    ContactSection: {
      label: "Contact Section",
      fields: {
        heading: { type: "text", label: "Left Side Heading" },
        description: { type: "textarea", label: "Left Side Description" },
        formHeading: { type: "text", label: "Form Heading" },
        firstNameLabel: { type: "text", label: "First Name Field Label" },
        lastNameLabel: { type: "text", label: "Last Name Field Label" },
        emailLabel: { type: "text", label: "Email Field Label" },
        phoneLabel: { type: "text", label: "Phone Field Label" },
        messageLabel: { type: "textarea", label: "Message Field Label" },
        submitButton: {
          type: "object",
          label: "Submit Button",
          objectFields: {
            text: { type: "text", label: "Text" },
            textColor: {
              type: "custom",
              label: "Text Color Field",
              render: ({ value, onChange }: { value: any, onChange: any }) => (
                <MuiColorInput
                  value={value}
                  onChange={onChange}
                  label="Text Color"
                />
              ),
            } as any,
            color: {
              type: "custom",
              label: "Button Color Field",
              render: ({ value, onChange }: { value: any, onChange: any }) => (
                <MuiColorInput
                  value={value}
                  onChange={onChange}
                  label="Button Color"
                />
              ),
            } as any,
            size: {
              type: "radio",
              label: "Size",
              options: [
                { value: "small", label: "Small" },
                { value: "medium", label: "Medium" },
                { value: "large", label: "Large" }
              ]
            },
            fullWidth: {
              type: "select",
              label: "Full Width",
              options: [
                { value: true, label: "True" },
                { value: false, label: "False" }
              ]
            },
            disableElevation: {
              type: "select",
              label: "Disable Elevation",
              options: [
                { value: true, label: "True" },
                { value: false, label: "False" }
              ]
            }
          } as any
        },
        backgroundColor: {
          type: "custom",
          label: "Background Color",
          render: ({ value, onChange }: { value: any, onChange: any }) => (
            <MuiColorInput
              value={value}
              onChange={onChange}
              label="Background Color"
            />
          ),
        } as any,
        formBackgroundColor: {
          type: "custom",
          label: "Form Background Color",
          render: ({ value, onChange }: { value: any, onChange: any }) => (
            <MuiColorInput
              value={value}
              onChange={onChange}
              label="Form Background Color"
            />
          ),
        } as any,
      },
      defaultProps: {
        heading: "Write your Headline here",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren.",
        formHeading: "Get in Touch",
        firstNameLabel: "Enter your first name.",
        lastNameLabel: "Enter your last name.",
        emailLabel: "Enter your email ID.",
        phoneLabel: "+91 Mobile Number",
        messageLabel: "Write your Message here.",
        submitButton: defaultSubmitButton,
        backgroundColor: '#f4f4f4',
        formBackgroundColor: '#f4f4f4',
      },
      render: (props: ContactSectionProps) => <ContactSection {...props} />,
    },
    FooterA: {
      label: "Footer",
      fields: {
        getInTouchHeading: { type: "text", label: "Get in Touch Heading" },
        getInTouchText: { type: "textarea", label: "Get in Touch Text" },
        chatHeading: { type: "text", label: "Chat Heading" },
        chatText: { type: "textarea", label: "Chat Text" },
        chatEmail: { type: "text", label: "Chat Email" },
        officeHeading: { type: "text", label: "Office Heading" },
        officeText: { type: "textarea", label: "Office Text" },
        officeAddress: { type: "textarea", label: "Office Address" },
        phoneHeading: { type: "text", label: "Phone Heading" },
        phoneSchedule: { type: "text", label: "Phone Schedule" },
        phoneNumbers: {
          type: "array",
          label: "Phone Numbers",
          getItemSummary: (item: any) => item,
          arrayFields: {
            value: { type: "text", label: "Phone Number" },
          }
        } as any, // Cast to any to satisfy type checking for now
        copyrightText: { type: "text", label: "Copyright Text" },
        footerLinks: {
          type: "array",
          label: "Footer Links",
          getItemSummary: (item: any) => item.text,
          arrayFields: {
            text: { type: "text", label: "Text" },
            href: { type: "text", label: "URL" },
          }
        },
        textColor: {
          type: "custom",
          label: "Text Color",
          render: ({ value, onChange }: { value: any, onChange: any }) => (
            <MuiColorInput
              value={value}
              onChange={onChange}
              label="Text Color"
            />
          ),
        } as any,
        backgroundColor: {
          type: "custom",
          label: "Background Color",
          render: ({ value, onChange }: { value: any, onChange: any }) => (
            <MuiColorInput
              value={value}
              onChange={onChange}
              label="Background Color"
            />
          ),
        } as any,
      },
      defaultProps: {
        getInTouchHeading: "Get in touch",
        getInTouchText: "We love to hear from you. Our friendly team is always here to chat.",
        chatHeading: "Chat to us",
        chatText: "Our friendly team is here to help.",
        chatEmail: "dummy@edmingle.com",
        officeHeading: "Office",
        officeText: "Come say hello at our office.",
        officeAddress: "Akshya Nagar 1st Block 1st Cross,\nRamamurthy nagar, Bangalore-560016",
        phoneHeading: "Phone",
        phoneSchedule: "Mon - Fri from 8am to 6pm",
        phoneNumbers: ["+91 38574 94827", "+91 81211 21112"],
        copyrightText: "© 2025 Teknas",
        footerLinks: [
          { text: "Courses", href: "#courses" },
          { text: "Contact Us", href: "#contact" },
        ],
        textColor: '#ffffff',
        backgroundColor: '#0077cc',
      },
      render: (props: FooterAProps) => <FooterA {...props} />,
    },
    // CustomLink: CustomLinkConfig,
    // Navbar: NavbarConfig,
    // HeroSection: HeroSectionConfig,
    // FeatureSection: FeatureSectionConfig,
    // Testimonials: TestimonialsSectionConfig,
    // Footer: FooterConfig,
    // Profile: ProfileConfig,
    // TabNavigation: TabNavigationConfig,
    // AdvancedTable: AdvancedTablePuckConfig,
    // CardA: CardAConfig,
    // CardB: CardBConfig,
    // CardC: CardCConfig,
    // Header: HeaderConfig,
    // HeroSectionA: HeroSectionConfigA,
    // Categories: CategoriesConfig,
    // ContactSection: ContactSectionConfig,
    // FooterA: FooterConfigA,

    // ColorPicker: ColorPickerConfig,
    // DynamicButton: DynamicButtonConfig,
  },
  categories: {
    templateA: {
      title: 'Template A',
      components: ['Header', 'HeroSectionA', 'Categories', 'ContactSection', 'FooterA'],
    },
    // navigation: {
    //   title: 'Navigation',
    //   components: ['TabNavigation', 'CustomLink'],
    // },
    // layout: {
    //   title: 'Layout',
    //   components: ['HeroSection', 'FeatureSection', 'Testimonials', 'ExecutiveTeam', 'FAQ', 'Footer'],
    // },
    // 'data-display': {
    //   title: 'Data Display',
    //   components: ['AdvancedTable', 'CardA', 'CardB', 'CardC'],
    // },
  },
};

export default customConfig;