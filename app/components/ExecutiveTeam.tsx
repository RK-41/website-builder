import { Card, CardContent, CardHeader, Avatar, Typography, Grid, Container } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import ChatIcon from '@mui/icons-material/Chat';
import Link from 'next/link';

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
  linkedin?: string;
  github?: string;
  discord?: string;
}

export interface ExecutiveTeamProps {
  title: string;
  description?: string;
  members: TeamMember[];
}

export const ExecutiveTeam = ({ title, description, members }: ExecutiveTeamProps) => {
  return (
    <section className="bg-white dark:bg-gray-900 py-10">
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" className="text-gray-800 dark:text-white capitalize font-semibold">
          {title}
        </Typography>
        {description && (
          <Typography variant="body1" align="center" className="text-gray-500 dark:text-gray-300 max-w-2xl mx-auto my-6">
            {description}
          </Typography>
        )}
        <Grid container spacing={4} className="mt-8 xl:mt-16">
          {members.map((member, index) => (
            <Grid key={index} size={{ xs: 12, md: 6 }}>
              <Card className="group border border-gray-200 dark:border-gray-700 hover:border-transparent hover:bg-blue-600 transition-colors duration-300 rounded-xl px-4 py-6 cursor-pointer">
                <CardHeader
                  avatar={<Avatar src={member.image} sx={{ width: 64, height: 64 }} />}
                  title={
                    <Typography variant="h6" className="text-gray-700 dark:text-white group-hover:text-white capitalize">
                      {member.name}
                    </Typography>
                  }
                  subheader={
                    <Typography className="text-gray-500 dark:text-gray-300 group-hover:text-gray-300 capitalize">
                      {member.role}
                    </Typography>
                  }
                />
                <CardContent>
                  <Typography className="text-gray-500 dark:text-gray-300 group-hover:text-gray-300">
                    {member.description}
                  </Typography>
                  <div className="flex mt-4">
                    {member.linkedin && (
                      <Link href={member.linkedin} className="mx-2 text-gray-600 dark:text-gray-300 group-hover:text-white">
                        <LinkedInIcon />
                      </Link>
                    )}
                    {member.discord && (
                      <Link href={member.discord} className="mx-2 text-gray-600 dark:text-gray-300 group-hover:text-white">
                        <ChatIcon />
                      </Link>
                    )}
                    {member.github && (
                      <Link href={member.github} className="mx-2 text-gray-600 dark:text-gray-300 group-hover:text-white">
                        <GitHubIcon />
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export const ExecutiveTeamConfig = {
  label: "Executive Team",
  fields: {
    title: { type: "text", label: "Section Title" },
    description: { type: "text", label: "Section Description" },
    members: {
      type: "array",
      label: "Team Members",
      arrayFields: {
        name: { type: "text", label: "Name" },
        role: { type: "text", label: "Role" },
        image: { type: "text", label: "Image URL" },
        description: { type: "text", label: "Description" },
        github: { type: "text", label: "GitHub URL" },
        linkedin: { type: "text", label: "LinkedIn URL" },
        discord: { type: "text", label: "Discord URL" },
      },
    },
  },
  defaultProps: {
    title: "Our Executive Team",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo incidunt ex placeat modi magni quia error alias, adipisci rem similique.",
    members: [
      {
        name: "Arthur Melo",
        role: "Design Director",
        image:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=880&q=80",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum nesciunt officia aliquam neque optio?",
        linkedin: "#",
        discord: "#",
        github: "#",
      },
      {
        name: "Amelia Anderson",
        role: "Lead Developer",
        image:
          "https://images.unsplash.com/photo-1531590878845-12627191e687?auto=format&fit=crop&w=764&q=80",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum nesciunt officia aliquam neque optio?",
        linkedin: "#",
        discord: "#",
        github: "#",
      },
    ],
  },
  render: (props: ExecutiveTeamProps) => <ExecutiveTeam {...props} />,
};