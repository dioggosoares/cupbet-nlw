import { Avatar, Center, HStack, Text } from 'native-base'

import { Participant } from '../@types/participants'

interface ParticipantsProps {
  participants: Participant[]
  count: number
}

export function Participants({ participants, count }: ParticipantsProps) {
  return (
    <HStack>
      {participants &&
        participants.map((participant) => (
          <Avatar
            key={participant.id}
            source={{ uri: participant.user.avatarUrl }}
            w={8}
            h={8}
            rounded="full"
            borderWidth={2}
            marginRight={-3}
            borderColor="gray.800"
          >
            {participant.user?.name?.at(0).toUpperCase()}
          </Avatar>
        ))}

      <Center
        w={8}
        h={8}
        bgColor="gray.700"
        rounded="full"
        borderWidth={1}
        borderColor="gray.800"
      >
        <Text color="gray.100" fontSize="xs" fontFamily="medium">
          {count ? `+${count}` : 0}
        </Text>
      </Center>
    </HStack>
  )
}
