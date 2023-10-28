import { Card as MatineCard, Image, Text, Badge, Button, Group } from '@mantine/core';
import Link from 'next/link';
import dayjs from 'dayjs';

type Props = {
   email: string
   fullname: string
   date: Date
   commit: string
   commitUrl: string
}

export default function Card({ commit, commitUrl, date, email, fullname }: Props) {
   return (
      <MatineCard shadow="xs" padding="lg" radius="md" withBorder className='my-10'>
         <MatineCard.Section>
            <Image
               src="https://avatars.githubusercontent.com/u/67993552?v=4"
               height={40}
               alt="Norway"
            />
         </MatineCard.Section>

         <Group mt="md" mb="xs">
            <div className='flex flex-col'>
               <Text style={{ fontSize: 15 }} fw={400}>{email}</Text>
               <Text fw={500}>{fullname}</Text>
            </div>
            <Badge color="pink" variant="light">
               {dayjs(date).format('YYYY-MM-DD')}
            </Badge>
         </Group>

         <Text size="sm" c="dimmed">
            {commit}
         </Text>

         <Link href={commitUrl} rel="noopener noreferrer" target="_blank">
            <Button variant="light" color="blue" fullWidth mt="md" radius="md" >
               See commit on github
            </Button>
         </Link>
      </MatineCard>
   );
}