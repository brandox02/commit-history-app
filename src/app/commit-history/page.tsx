'use client';

import Card from "@/components/Card";
import TextInput from "@/components/TextInput";
import axios from "@/config/axios";
import { Text } from "@mantine/core";
import { useQuery } from '@tanstack/react-query';

interface CommitAuthorClass {
   name: string;
   email: string;
   date: Date;
}

interface Commit {
   author: CommitAuthorClass;
   committer: CommitAuthorClass;
   message: string;
   url: string;
   comment_count: number
   id: string,
   avatar_url: string
}

// type f = { username: string, repo: string }
export default function App() {
   const username = 'brandox02';
   const repo = 'commit-history-api';

   const { data } = useQuery({
      queryKey: ['/commit-history', JSON.stringify({ username, repo })],
      queryFn: () => axios.get('/commit-history', { params: { username, repo } })
   });

   const commits: Commit[] = data?.data || [];

   return <div className="bg-[#F8F9FA] w-full p-10 relative">
      <Text
         className="sticky top-0"
         align="center"
         size="xl"
         fw={900}
         variant="gradient"
         gradient={{ from: 'blue', to: 'cyan', deg: 215 }}
      >Commit History App</Text>
      {/* <TextInput
         label="Email"
         className=""
         style={2}
         onChange={(e) => 'fds'}
         value={''}
      /> */}
      <div className="flex justify-center gap-5 flex-col items-center mt-10" >
         {commits.map(({ id, author, message, url, avatar_url }) => (
            <div
               key={id}
            >
               <Card

                  commit={message}
                  commitUrl={url}
                  date={author.date}
                  email={author.email}
                  fullname={author.name}
                  photoUrl={avatar_url}
               />
            </div>
         ))}

      </div>
   </div>
}