import { Card as MatineCard, Image, Text, Badge, Button, Group, Avatar } from '@mantine/core';
import Link from 'next/link';
import dayjs from 'dayjs';

type Props = {
   email: string
   fullname: string
   date: Date
   commit: string
   commitUrl: string
   photoUrl: string
}

export default function Card({ commit, commitUrl, date, email, fullname, photoUrl }: Props) {
   return (
      <MatineCard shadow="xs" padding="lg" radius="md" withBorder className='mx-10 '>
         <MatineCard.Section>

         </MatineCard.Section>

         <div className='flex justify-between items-center py-3'>
            <div className='flex gap-3 items-center'>
               <Avatar src={photoUrl} alt="it's me" size={'lg'} />
               <div className='flex flex-col'>
                  <Text fw={500}>{fullname}</Text>
                  <Text style={{ fontSize: 15 }} fw={400}>{email}</Text>
               </div>
            </div>
            <Badge color="pink" variant="light" className='border'>
               {dayjs(date).format('YYYY-MM-DD')}
            </Badge>
         </div>

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