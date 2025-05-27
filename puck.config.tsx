import { Config } from "@measured/puck";
import CustomLinkConfig from "./app/components/CustomLink";
import { NavbarConfig } from "./app/components/Navbar";
import { HeroSectionConfig } from "./app/components/HeroSection";
import { FeatureSectionConfig } from "./app/components/FeatureSection";
import { FooterConfig } from "./app/components/Footer";
import { TestimonialsSectionConfig } from "./app/components/Testimonials";
import TabNavigationConfig from "./app/components/TabNavigation";
import { AdvancedTablePuckConfig } from "./app/components/AdvancedTable";
import { ProfileConfig } from "./app/components/Profile";
import { CardAConfig, CardBConfig, CardCConfig } from "./app/components/cards";
import { FaqSectionConfig } from "./app/components/FAQSection";
import { ExecutiveTeamConfig } from "./app/components/ExecutiveTeam";
import { HeaderConfig } from "./app/components/templateA/Header";
import { HeroSectionConfigA } from "./app/components/templateA/HeroSection";
import { DynamicButtonConfig } from "./app/components/DynamicButton";
import { CategoriesConfig } from "./app/components/templateA/Categories";
import { ContactSectionConfig } from "./app/components/templateA/ContactSection";
import { FooterConfigA } from "./app/components/templateA/Footer";
import { ColorPickerConfig } from "./app/components/ColorPicker";

// growth, partners, contact us, faqs, hero with para
// type Props = {
//   Link?: typeof CustomLinkConfig;
//   Navbar?: NavbarProps;
//   HeadingBlock?: { title: string };
//   HeroSection?: { title: string },
//   HeroSectionBasic?: { title: string; subtitle: string };
//   FeaturesSection?: { features: string[] };
//   Footer?: { text: string };
// };

export const customConfig = {
  components: {
    Link: CustomLinkConfig,
    Navbar: NavbarConfig,
    HeroSection: HeroSectionConfig,
    FeatureSection: FeatureSectionConfig,
    Testimonials: TestimonialsSectionConfig,
    ExecutiveTeam: ExecutiveTeamConfig,
    FAQ: FaqSectionConfig,
    Footer: FooterConfig,

    Profile: ProfileConfig,

    TabNavigation: TabNavigationConfig,
    AdvancedTable: AdvancedTablePuckConfig,

    CardA: CardAConfig,
    CardB: CardBConfig,
    CardC: CardCConfig,

    Header: HeaderConfig,
    HeroSectionA: HeroSectionConfigA,
    Categories: CategoriesConfig,
    ContactSection: ContactSectionConfig,
    FooterA: FooterConfigA,

    ColorPicker: ColorPickerConfig,
    DynamicButton: DynamicButtonConfig,
  },
  categories: {
    templateA: {
      title: 'Template A',
      components: ['Header', 'HeroSectionA', 'Categories', 'ContactSection', 'FooterA',]
    },
    navigation: {
      title: 'Navigation',
      components: ['Navbar', 'TabNavigation', 'Link'],
    },
    layout: {
      title: 'Layout',
      components: ['HeroSection', 'FeatureSection', 'Testimonials', 'ExecutiveTeam', 'FAQ', 'Footer'],
    },
    'data-display': {
      title: 'Data Display',
      components: ['AdvancedTable', 'CardA', 'CardB', 'CardC'],
    },
  },
};

export default customConfig;